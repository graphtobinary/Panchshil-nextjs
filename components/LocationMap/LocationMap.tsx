"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import {
  LandmarkCategoryNormalized,
  LandmarkNormalized,
  LocationMapProps,
  MapLocation,
} from "@/interfaces";
import Image from "next/image";

const base = "/assets/images/map/";

// Light map style matching panchshil.com/57-avenue reference
const MAP_STYLE: google.maps.MapTypeStyle[] = [
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [{ color: "#f5f5f5" }],
  },
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [{ color: "#5c5c5c" }],
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#e8e8e8" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#d0d0d0" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#c9e6f5" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#e8f0e8" }],
  },
];

// Custom property pin icon (gold-beige #9E8C70)
const PROPERTY_PIN_SVG =
  '<svg width="65" height="65" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.626 2.29A4.92 4.92 0 005.13.848 4.92 4.92 0 001.635 2.29c-1.926 1.922-2.18 4.642-.31 7.408.95 1.397 3.805 4.905 3.805 4.905s2.857-3.508 3.806-4.905c1.87-2.757 1.616-5.476-.31-7.408zM5.13 8.884A2.967 2.967 0 012.161 5.92a2.973 2.973 0 012.97-2.963A2.972 2.972 0 018.1 5.92a2.972 2.972 0 01-2.97 2.963z" fill="#9E8C70"/></svg>';

const PROPERTY_PIN_ICON =
  "data:image/svg+xml," + encodeURIComponent(PROPERTY_PIN_SVG);

const resolveIconSrc = (iconName: string) => {
  if (!iconName) return `${base}atm.png`;
  if (
    iconName.startsWith("http://") ||
    iconName.startsWith("https://") ||
    iconName.startsWith("/") ||
    iconName.startsWith("data:")
  ) {
    return iconName;
  }
  return `${base}${iconName}`;
};

// Icon components for categories
const CategoryIcon = ({ iconName }: { iconName: string }) => {
  const src = resolveIconSrc(iconName);
  return <Image src={src} alt={iconName} width={24} height={24} unoptimized />;
};

export default function LocationMap({
  title = "MAPS",
  property_location_co_ordinates,
  property_location,
  property_landmark_categories,
  property_landmarks,
  property_3d_map_link,
}: LocationMapProps) {
  const [mapView, setMapView] = useState<"2d" | "3d">("2d");
  const [active, setActive] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const propertyPositionRef = useRef<google.maps.LatLng | null>(null);
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(
    null
  );
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(
    null
  );
  const destinationMarkerRef = useRef<google.maps.Marker | null>(null);
  const routePolylineRef = useRef<google.maps.Polyline | null>(null);
  const routeAnimFrameRef = useRef<number | null>(null);
  const markersRef = useRef<Record<string, google.maps.Marker>>({});
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const [isInView, setIsInView] = useState(false);
  const normalizedCategories: LandmarkCategoryNormalized[] = useMemo(
    () =>
      property_landmark_categories.map((category) => {
        const categoryRecord = category as unknown as Record<string, unknown>;
        const title =
          (categoryRecord.property_landmark_category_title as string) ||
          (categoryRecord.property_landmark_category_name as string) ||
          "";
        const icon =
          (categoryRecord.property_landmark_category_icon as string) ||
          (categoryRecord.property_landmark_category_image as string) ||
          "atm.png";

        return { title, icon };
      }),
    [property_landmark_categories]
  );

  const normalizedLandmarks: (LandmarkNormalized & { description?: string })[] =
    useMemo(() => {
      const mapped: (LandmarkNormalized & { description?: string })[] = [];

      property_landmarks.forEach((landmark) => {
        const landmarkRecord = landmark as unknown as Record<string, unknown>;
        const coordinates = landmarkRecord.property_location_co_ordinates as
          | Record<string, unknown>
          | undefined;

        const lat =
          (landmarkRecord.property_landmark_latitude as number) ??
          (coordinates?.property_latitude as number | undefined);
        const lng =
          (landmarkRecord.property_landmark_longitude as number) ??
          (coordinates?.property_longitude as number | undefined);

        if (typeof lat !== "number" || typeof lng !== "number") return;

        const descriptionRaw =
          (landmarkRecord.property_landmark_description as string) ??
          (landmarkRecord.property_location_description as string) ??
          undefined;

        mapped.push({
          name:
            (landmarkRecord.property_landmark_name as string) ||
            (landmarkRecord.property_location_caption as string) ||
            "Landmark",
          lat,
          lng,
          icon:
            (landmarkRecord.property_location_marker as string) ||
            (landmarkRecord.property_landmark_marker as string) ||
            "atm.png",
          categoryKey:
            (landmarkRecord.property_landmark_category_title as string) ||
            (landmarkRecord.property_landmark_category_name as string) ||
            (landmarkRecord.property_landmark_category as string) ||
            undefined,
          description:
            typeof descriptionRaw === "string" ? descriptionRaw : undefined,
        });
      });

      return mapped;
    }, [property_landmarks]);

  const locations: MapLocation[] = useMemo(() => {
    if (!normalizedCategories.length) {
      return normalizedLandmarks.map((landmark, index) => ({
        id: `landmark-${index}`,
        title: landmark.name,
        type: "atm",
        lat: landmark.lat,
        lng: landmark.lng,
        zoom: 14,
        icon: landmark.icon,
      }));
    }

    const mapped: MapLocation[] = [];
    normalizedCategories.forEach((category, index) => {
      const matchedLandmark =
        normalizedLandmarks.find(
          (landmark) =>
            landmark.categoryKey?.trim().toLowerCase() ===
            category.title.trim().toLowerCase()
        ) || normalizedLandmarks[index];

      if (!matchedLandmark) return;

      mapped.push({
        id: `landmark-${index}`,
        title: category.title || matchedLandmark.name,
        type: "atm",
        lat: matchedLandmark.lat,
        lng: matchedLandmark.lng,
        zoom: 14,
        icon: category.icon || matchedLandmark.icon,
      });
    });

    return mapped;
  }, [normalizedCategories, normalizedLandmarks]);

  const clearRoute = useCallback(() => {
    if (routeAnimFrameRef.current) {
      cancelAnimationFrame(routeAnimFrameRef.current);
      routeAnimFrameRef.current = null;
    }
    routePolylineRef.current?.setMap(null);
    routePolylineRef.current = null;
  }, []);

  const animateRoute = useCallback(
    (routePath: google.maps.LatLng[], durationMs = 1400) => {
      const map = mapInstance.current;
      if (!map || routePath.length < 2) return;

      clearRoute();

      const polyline = new google.maps.Polyline({
        map,
        path: [],
        strokeColor: "#9E8C70",
        strokeOpacity: 0.9,
        strokeWeight: 5,
        geodesic: true,
      });
      routePolylineRef.current = polyline;

      const start = performance.now();
      const totalPoints = routePath.length;
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        const count = Math.max(2, Math.floor(eased * totalPoints));
        polyline.setPath(routePath.slice(0, count));
        if (t < 1) {
          routeAnimFrameRef.current = requestAnimationFrame(step);
        } else {
          routeAnimFrameRef.current = null;
          polyline.setPath(routePath);
        }
      };
      routeAnimFrameRef.current = requestAnimationFrame(step);
    },
    [clearRoute]
  );

  const drawRouteTo = useCallback(
    async (
      destination: google.maps.LatLng,
      opts?: { suppressDestinationMarker?: boolean }
    ) => {
      const origin = propertyPositionRef.current;
      const service = directionsServiceRef.current;
      const map = mapInstance.current;
      if (!origin || !service || !map) return;

      if (opts?.suppressDestinationMarker) {
        destinationMarkerRef.current?.setMap(null);
        destinationMarkerRef.current = null;
      } else {
        destinationMarkerRef.current?.setMap(null);
        destinationMarkerRef.current = new google.maps.Marker({
          position: destination,
          map,
          title: "Destination",
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 7,
            fillColor: "#202020",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeOpacity: 1,
            strokeWeight: 2,
          },
        });
      }

      try {
        const res = await service.route({
          origin,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
        });
        const path = res.routes?.[0]?.overview_path as
          | google.maps.LatLng[]
          | undefined;
        if (path?.length) {
          animateRoute(path);
        } else {
          clearRoute();
        }
        const leg = res.routes?.[0]?.legs?.[0];
        return {
          distanceText: leg?.distance?.text,
          durationText: leg?.duration?.text,
        };
      } catch {
        // If routing fails (no road access, quota, etc.), we simply don't draw.
        clearRoute();
        return;
      }
    },
    [animateRoute, clearRoute]
  );

  const getLocationMeta = useCallback(
    (id: string) => {
      const idx = Number(id.replace("landmark-", ""));
      const landmark = Number.isFinite(idx)
        ? normalizedLandmarks[idx]
        : undefined;
      const category =
        normalizedCategories[idx]?.title || landmark?.categoryKey;
      return {
        placeName: landmark?.name,
        description: landmark?.description,
        category,
      };
    },
    [normalizedCategories, normalizedLandmarks]
  );

  const openPlaceInfo = useCallback(
    (args: {
      anchor: google.maps.Marker;
      title: string;
      description?: string;
      category?: string;
      distanceText?: string;
      durationText?: string;
    }) => {
      const map = mapInstance.current;
      if (!map) return;

      if (!infoWindowRef.current) {
        infoWindowRef.current = new google.maps.InfoWindow({
          maxWidth: 320,
        });
      }

      const safeTitle = escapeHtml(args.title);
      const safeCategory = args.category
        ? escapeHtml(args.category)
        : undefined;
      const safeDistance = args.distanceText
        ? escapeHtml(args.distanceText)
        : undefined;
      const safeDuration = args.durationText
        ? escapeHtml(args.durationText)
        : undefined;
      const safeDescription = args.description
        ? escapeHtml(args.description)
        : undefined;

      infoWindowRef.current.setContent(
        `
        <style>
          @keyframes lmPopIn {
            0% { transform: scale(0.92); opacity: 0; filter: blur(2px); }
            100% { transform: scale(1); opacity: 1; filter: blur(0); }
          }
        </style>
        <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'; padding: 8px 10px; min-width: 240px; transform-origin: 80% 10%; animation: lmPopIn 180ms ease-out;">
          <div style="font-size: 16px; font-weight: 600; color: #111; margin-bottom: 6px;">
            ${safeTitle}
          </div>
          ${
            safeDescription
              ? `<div style="font-size: 12px; color: #4b5563; line-height: 1.35; margin-bottom: 8px;">
                  ${safeDescription}
                </div>`
              : ""
          }
          <div style="display: grid; gap: 4px;">
            ${
              safeDistance
                ? `<div style="font-size: 12px; color: #111;"><span style="color:#6b7280;">Distance:</span> ${safeDistance}</div>`
                : ""
            }
            ${
              safeDuration
                ? `<div style="font-size: 12px; color: #111;"><span style="color:#6b7280;">Driving time:</span> ${safeDuration}</div>`
                : ""
            }
            ${
              safeCategory
                ? `<div style="font-size: 12px; color: #111;"><span style="color:#6b7280;">Category:</span> ${safeCategory}</div>`
                : ""
            }
          </div>
        </div>
        `.trim()
      );

      infoWindowRef.current.open({
        map,
        anchor: args.anchor,
      });
    },
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setOptions({
      key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      v: "weekly",
    });

    Promise.all([importLibrary("maps"), importLibrary("routes")]).then(() => {
      if (!mapRef.current || !property_location_co_ordinates) return;

      const { property_latitude, property_longitude } =
        property_location_co_ordinates;
      const propertyPosition = new google.maps.LatLng(
        property_latitude,
        property_longitude
      );
      propertyPositionRef.current = propertyPosition;

      const map = new google.maps.Map(mapRef.current, {
        center: propertyPosition,
        zoom: 14,
        styles: MAP_STYLE,
        disableDefaultUI: true,
      });

      mapInstance.current = map;

      // Property drop pin marker
      new google.maps.Marker({
        position: propertyPosition,
        map,
        title: "Property Location",
        icon: {
          url: PROPERTY_PIN_ICON,
          scaledSize: new google.maps.Size(48, 65),
          anchor: new google.maps.Point(24, 65),
        },
      });

      // Routing (click anywhere → route from property → clicked place)
      directionsServiceRef.current = new google.maps.DirectionsService();
      directionsRendererRef.current = new google.maps.DirectionsRenderer({
        map,
        suppressMarkers: true,
        preserveViewport: true,
        polylineOptions: {
          strokeColor: "#9E8C70",
          strokeOpacity: 0.9,
          strokeWeight: 5,
        },
      });
      // We draw our own animated polyline; keep the renderer detached.
      directionsRendererRef.current.setMap(null);

      const clickListener = map.addListener(
        "click",
        (e: google.maps.MapMouseEvent) => {
          if (!e.latLng) return;
          drawRouteTo(e.latLng);
        }
      );

      const bounds = new google.maps.LatLngBounds();
      bounds.extend(propertyPosition);

      // Add markers from API landmarks
      Object.values(markersRef.current).forEach((m) => m.setMap(null));
      markersRef.current = {};
      locations.forEach((loc) => {
        const marker = new google.maps.Marker({
          position: { lat: loc.lat, lng: loc.lng },
          map,
          title: loc.title,
          icon: getMarkerIcon(loc.icon),
        });
        markersRef.current[loc.id] = marker;

        marker.addListener("click", async () => {
          setActive(loc.id);
          map.panTo({ lat: loc.lat, lng: loc.lng });
          map.panBy(0, -100);

          const meta = getLocationMeta(loc.id);
          const routeInfo = await drawRouteTo(
            new google.maps.LatLng(loc.lat, loc.lng),
            { suppressDestinationMarker: true }
          );
          openPlaceInfo({
            anchor: marker,
            title: meta.placeName || loc.title,
            description: meta.description,
            category: meta.category,
            distanceText: routeInfo?.distanceText,
            durationText: routeInfo?.durationText,
          });
        });

        bounds.extend({ lat: loc.lat, lng: loc.lng });
      });

      // Fit map to show property + all nearby places with padding
      map.fitBounds(bounds, { top: 60, right: 60, bottom: 60, left: 60 });

      return () => {
        google.maps.event.removeListener(clickListener);
        Object.values(markersRef.current).forEach((m) => m.setMap(null));
        markersRef.current = {};
        clearRoute();
      };
    });
  }, [
    drawRouteTo,
    clearRoute,
    getLocationMeta,
    locations,
    openPlaceInfo,
    property_location_co_ordinates,
  ]);

  const panToLocation = (location: MapLocation) => {
    if (!mapInstance.current) return;

    mapInstance.current.panTo({
      lat: location.lat,
      lng: location.lng,
    });
    mapInstance.current.panBy(0, -100); // subtle cinematic shift
    // mapInstance.current.moveCamera({
    //   center: { lat, lng },
    //   zoom,
    // });

    if (location.zoom) {
      mapInstance.current.setZoom(location.zoom);
    }

    setActive(location.id);

    // Also draw route from property → this landmark
    const marker = markersRef.current[location.id];
    const meta = getLocationMeta(location.id);
    drawRouteTo(new google.maps.LatLng(location.lat, location.lng), {
      suppressDestinationMarker: true,
    }).then((routeInfo) => {
      if (!marker) return;
      openPlaceInfo({
        anchor: marker,
        title: meta.placeName || location.title,
        description: meta.description,
        category: meta.category,
        distanceText: routeInfo?.distanceText,
        durationText: routeInfo?.durationText,
      });
    });
  };

  useEffect(() => {
    if (mapView !== "2d" || !mapInstance.current) return;
    const center = mapInstance.current.getCenter();
    google.maps.event.trigger(mapInstance.current, "resize");
    if (center) mapInstance.current.setCenter(center);
  }, [mapView]);
  if (!property_location_co_ordinates) return null;
  return (
    <section ref={sectionRef} className="w-full pt-0 md:pt-20 bg-white">
      <div className="mx-auto max-w-[1920px]">
        {/* Title and Description */}
        <div
          className={`text-center mb-20 px-4 md:px-0 ${
            isInView ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <div className="text-lg font-medium tracking-[0.2em] text-[#9E8C70] mb-2 uppercase">
            {title}
          </div>
          <h2 className="text-2xl md:text-[28px] font-display-semi text-black mb-4">
            {property_location?.property_location_caption}
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-4xl mx-auto">
            {property_location?.property_location_description}
          </p>
        </div>

        {/* Map View Toggles - First */}
        {/* <div
          className={`flex items-center justify-center gap-4 mb-10 ${
            isInView ? "animate-fade-in-up-delay-1" : "opacity-0"
          }`}
        >
          <button
            onClick={() => setMapView("2d")}
            className={`text-[12px] md:text-[16px] font-medium tracking-wider transition-colors ${
              mapView === "2d"
                ? "text-gold-beige border-b-3 border-gold-beige"
                : "text-gold-beige/60 hover:text-gold-beige"
            }`}
          >
            2D MAP VIEW
          </button>
          <button
            onClick={() => setMapView("3d")}
            className={`text-[12px] md:text-[16px] font-medium tracking-wider transition-colors ${
              mapView === "3d"
                ? "text-gold-beige border-b-3 border-gold-beige"
                : "text-gold-beige/60 hover:text-gold-beige"
            }`}
          >
            3D MAP VIEW
          </button>
        </div> */}

        {/* Tabs + Map (full width map with tabs above, right aligned) */}
        <div className="w-full px-4 md:px-0">
          {/* Tabs 2D/3D */}
          <div
            className={`mb-6 px-6 flex flex-wrap items-center justify-between gap-4 ${
              isInView ? "animate-fade-in-up-delay-1" : "opacity-0"
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-lg leading-none text-[#202020] font-normal">
                MAP VIEW
              </span>
              <div className="inline-flex items-center rounded-full bg-[#D9D2C5] p-2">
                <button
                  onClick={() => setMapView("2d")}
                  className={`rounded-full px-5 py-2 text-lg font-semibold transition-colors ${
                    mapView === "2d"
                      ? "bg-white text-[#202020]"
                      : "text-[#202020] hover:text-black"
                  }`}
                >
                  2D
                </button>
                <button
                  onClick={() => setMapView("3d")}
                  className={`rounded-full px-5 py-2 text-lg font-semibold transition-colors ${
                    mapView === "3d"
                      ? "bg-white text-[#202020]"
                      : "text-[#202020] hover:text-black"
                  }`}
                >
                  3D
                </button>
              </div>
            </div>

            {mapView === "2d" && (
              <div className="flex flex-wrap items-center justify-start md:justify-end gap-x-5 gap-y-3">
                {locations.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No nearby landmarks found
                  </p>
                ) : (
                  locations.map((loc) => {
                    const isActive = (active ?? locations[0]?.id) === loc.id;
                    return (
                      <button
                        key={loc.id}
                        onClick={() => panToLocation(loc)}
                        className={`flex items-center gap-2 border-b-2 pb-1 text-[12px] md:text-[14px] font-medium tracking-wide transition-colors ${
                          isActive
                            ? "border-[#9E8C70] text-[#1F1F1F]"
                            : "border-transparent text-[#6F6F6F] hover:text-[#1F1F1F]"
                        }`}
                      >
                        <CategoryIcon iconName={loc.icon} />
                        <span>{loc.title}</span>
                      </button>
                    );
                  })
                )}
              </div>
            )}
          </div>

          <div
            className={`relative w-full h-[500px] md:h-[650px] overflow-hidden ${
              isInView ? "animate-fade-in-up-delay-2" : "opacity-0"
            }`}
          >
            <div
              ref={mapRef}
              className={`w-full h-full shadow-lg ${
                mapView === "2d" ? "block" : "hidden"
              }`}
            />
            {mapView === "3d" && property_3d_map_link && (
              <iframe
                src={property_3d_map_link}
                title="3D Property View"
                className="w-full h-full border-0 shadow-lg"
                allow="xr-spatial-tracking; fullscreen"
                allowFullScreen
                loading="lazy"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function getMarkerIcon(iconName: string) {
  return {
    url: resolveIconSrc(iconName),
    scaledSize: new google.maps.Size(36, 36),
  };
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

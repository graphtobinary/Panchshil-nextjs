export interface PointOfInterest {
  id: string;
  name: string;
  category: MapCategory;
  lat: number;
  lng: number;
  address?: string;
}

export type MapCategory =
  | "cafes-restaurants"
  | "transportation"
  | "medical-centers"
  | "schools-colleges"
  | "lifestyle-entertainment"
  | "science";

export interface MapCategoryData {
  id: MapCategory;
  title: string;
  icon: string; // Icon name or path
  markerIcon: string; // Google Maps marker icon color/URL
  pois: PointOfInterest[];
}

// Google Maps API type definitions
interface GoogleMapsSize {
  width: number;
  height: number;
}

interface GoogleMapsIcon {
  url: string;
  scaledSize?: GoogleMapsSize;
  size?: GoogleMapsSize;
  anchor?: { x: number; y: number };
}

type GoogleMapsWindow = Window & {
  google?: {
    maps: {
      Size: new (width: number, height: number) => GoogleMapsSize;
    };
  };
};

// Property location coordinates (Almeida Park, Bandra West, Mumbai)
export const PROPERTY_LOCATION = {
  lat: 19.0554,
  lng: 72.8262,
  name: "Omnia Residences",
  address: "Almeida Park, Bandra West, Mumbai",
};

// Helper function to get Google Maps marker icon URL by color
export const getMarkerIconUrl = (
  color: string,
  size: number = 40
): GoogleMapsIcon | undefined => {
  if (typeof window === "undefined") {
    return undefined;
  }

  const googleWindow = window as GoogleMapsWindow;
  if (!googleWindow.google?.maps) {
    return undefined;
  }

  const GoogleMapsSize = googleWindow.google.maps.Size;
  return {
    url: `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
    scaledSize: new GoogleMapsSize(size, size),
  };
};

// Helper function to get category marker icon
export const getCategoryMarkerIcon = (
  category: MapCategory
): GoogleMapsIcon | undefined => {
  const iconMap: Record<MapCategory, string> = {
    "cafes-restaurants": "orange",
    transportation: "blue",
    "medical-centers": "red",
    "schools-colleges": "green",
    "lifestyle-entertainment": "purple",
    science: "yellow",
  };
  return getMarkerIconUrl(iconMap[category] || "blue");
};

// Sample POIs - These should be replaced with actual data from your CMS/API
export const mapCategoriesData: MapCategoryData[] = [
  {
    id: "cafes-restaurants",
    title: "CAFES & RESTAURANTS",
    icon: "cutlery",
    markerIcon: "orange",
    pois: [
      {
        id: "1",
        name: "Living Free Cafe",
        category: "cafes-restaurants",
        lat: 19.056,
        lng: 72.827,
        address: "Near Almeida Park, Bandra West",
      },
      {
        id: "2",
        name: "Rajwadi Gaurav Thali Veg Restaurant",
        category: "cafes-restaurants",
        lat: 19.057,
        lng: 72.828,
        address: "Bandra West, Mumbai",
      },
      // Add more cafes/restaurants as needed
    ],
  },
  {
    id: "transportation",
    title: "TRANSPORTATION",
    icon: "bus",
    markerIcon: "blue",
    pois: [
      {
        id: "3",
        name: "Bandra Station",
        category: "transportation",
        lat: 19.059,
        lng: 72.83,
        address: "Bandra Station, Mumbai",
      },
      {
        id: "4",
        name: "Bandra-Worli Sea Link",
        category: "transportation",
        lat: 19.04,
        lng: 72.82,
        address: "Bandra-Worli Sea Link, Mumbai",
      },
      // Add more transportation points as needed
    ],
  },
  {
    id: "medical-centers",
    title: "MEDICAL CENTERS",
    icon: "medical",
    markerIcon: "red",
    pois: [
      {
        id: "5",
        name: "Lilavati Hospital",
        category: "medical-centers",
        lat: 19.052,
        lng: 72.824,
        address: "A-791, Bandra Reclamation, Bandra West",
      },
      // Add more medical centers as needed
    ],
  },
  {
    id: "schools-colleges",
    title: "SCHOOLS & COLLEGES",
    icon: "graduation",
    markerIcon: "green",
    pois: [
      {
        id: "6",
        name: "Jamnabai Narsee School",
        category: "schools-colleges",
        lat: 19.054,
        lng: 72.825,
        address: "Bandra West, Mumbai",
      },
      // Add more schools/colleges as needed
    ],
  },
  {
    id: "lifestyle-entertainment",
    title: "LIFESTYLE & ENTERTAINMENT",
    icon: "shopping",
    markerIcon: "purple",
    pois: [
      {
        id: "7",
        name: "Phoenix Mall of the Millennium",
        category: "lifestyle-entertainment",
        lat: 19.045,
        lng: 72.835,
        address: "Pune",
      },
      {
        id: "8",
        name: "Chumbak Moments",
        category: "lifestyle-entertainment",
        lat: 19.058,
        lng: 72.829,
        address: "Bandra West, Mumbai",
      },
      // Add more lifestyle/entertainment points as needed
    ],
  },
  {
    id: "science",
    title: "SCIENCE",
    icon: "science",
    markerIcon: "yellow",
    pois: [
      // Add science-related POIs as needed
    ],
  },
];

"use client";

import { useState, useRef, useEffect } from "react";
import { useThemeStore } from "@/store/themeStore";

interface DropdownOption {
  label: string;
  value: string;
}

interface StickyBottomBarProps {
  projectCount?: number;
  locations?: DropdownOption[];
  properties?: DropdownOption[];
  selectedLocation?: string | string[];
  selectedProperty?: string | string[];
  onLocationChange?: (value: string[]) => void;
  onPropertyChange?: (value: string[]) => void;
}

interface DropdownMenuProps {
  options: DropdownOption[];
  selectedValues?: string | string[];
  isOpen: boolean;
  onSelect: (value: string) => void;
  onClose: () => void;
  theme: "day" | "night";
}

function DropdownMenu({
  options,
  selectedValues,
  isOpen,
  onSelect,
  // onClose,
  theme,
}: DropdownMenuProps) {
  if (!isOpen) return null;

  // Normalize selectedValues to always be an array
  const selectedArray = Array.isArray(selectedValues)
    ? selectedValues
    : selectedValues
      ? [selectedValues]
      : [];

  const isSelected = (value: string) => selectedArray.includes(value);

  return (
    <div
      className={`absolute bottom-full left-0 mb-2 border border-golden-beige shadow-lg min-w-[260px] max-h-60 overflow-y-auto z-10 ${
        theme === "day" ? "bg-white" : "bg-black"
      }`}
    >
      <ul className="">
        {options.map((option) => {
          const selected = isSelected(option.value);
          return (
            <li key={option.value}>
              <button
                onClick={() => {
                  onSelect(option.value);
                }}
                className={`w-full text-black-chocolate border-b  text-left px-4 py-2 cursor-pointer text-sm transition-colors flex items-center gap-2 
                  ${theme === "day" ? "border-b-gold-beige" : "border-b-white"}
                  ${
                    selected
                      ? `${theme === "day" ? "bg-gold-beige" : "bg-gray-500"} font-medium text-white`
                      : theme === "day"
                        ? " "
                        : " bg-white"
                  }`}
              >
                <span
                  className={`w-3 h-3 border flex items-center justify-center ${
                    selected
                      ? `${theme === "day" ? "bg-gold-beige border-white" : "bg-gray-500 border-white"}`
                      : theme === "day"
                        ? "border-black"
                        : "border-white"
                  }`}
                >
                  {selected && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </span>
                {option.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function StickyBottomBar({
  projectCount = 12,
  locations = [
    { label: "Pune", value: "pune" },
    { label: "Mumbai", value: "mumbai" },
  ],
  properties = [
    { label: "Ready To Move In", value: "ready-to-move-in" },
    { label: "Under Construction", value: "under-construction" },
    { label: "Upcoming", value: "upcoming" },
    { label: "Sold Out", value: "sold-out" },
  ],
  selectedLocation,
  selectedProperty,
  onLocationChange,
  onPropertyChange,
}: StickyBottomBarProps) {
  const { theme, toggleTheme } = useThemeStore();
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isPropertyOpen, setIsPropertyOpen] = useState(false);
  const locationRef = useRef<HTMLDivElement>(null);
  const propertyRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        locationRef.current &&
        !locationRef.current.contains(event.target as Node)
      ) {
        setIsLocationOpen(false);
      }
      if (
        propertyRef.current &&
        !propertyRef.current.contains(event.target as Node)
      ) {
        setIsPropertyOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Normalize selected values to arrays
  const selectedLocationsArray = Array.isArray(selectedLocation)
    ? selectedLocation
    : selectedLocation
      ? [selectedLocation]
      : [];

  const selectedPropertiesArray = Array.isArray(selectedProperty)
    ? selectedProperty
    : selectedProperty
      ? [selectedProperty]
      : [];

  // Get labels for selected items
  const getSelectedLocationLabel = () => {
    if (selectedLocationsArray.length === 0) return "Select Location";
    if (selectedLocationsArray.length === 1) {
      return (
        locations.find((loc) => loc.value === selectedLocationsArray[0])
          ?.label || "Select Location"
      );
    }
    return `${selectedLocationsArray.length} selected`;
  };

  const getSelectedPropertyLabel = () => {
    if (selectedPropertiesArray.length === 0) return "Select Project Status";
    if (selectedPropertiesArray.length === 1) {
      return (
        properties.find((prop) => prop.value === selectedPropertiesArray[0])
          ?.label || "Select Project Status"
      );
    }
    return `${selectedPropertiesArray.length} selected`;
  };

  const selectedLocationLabel = getSelectedLocationLabel();
  const selectedPropertyLabel = getSelectedPropertyLabel();

  // Toggle selection handler
  const handleLocationToggle = (value: string) => {
    const current = selectedLocationsArray;
    const newSelection = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onLocationChange?.(newSelection);
  };

  const handlePropertyToggle = (value: string) => {
    const current = selectedPropertiesArray;
    const newSelection = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onPropertyChange?.(newSelection);
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 border-t shadow-lg transition-colors ${
        theme === "day"
          ? "bg-[#FFFAF7] border-gray-200"
          : "bg-black border-gray-700"
      }`}
    >
      <div className="container-standard px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-8">
          {/* Projects Found Text */}
          <div
            className={`text-sm md:text-base font-normal transition-colors ${
              theme === "day" ? "text-black-chocolate" : "text-white"
            }`}
          >
            {projectCount} Projects Found
          </div>

          {/* Dropdowns Container */}
          <div className="flex flex-row items-center gap-4 flex-1 justify-center">
            {/* Location Dropdown */}
            <div ref={locationRef} className="relative w-full">
              <button
                onClick={() => {
                  setIsLocationOpen(!isLocationOpen);
                  setIsPropertyOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-2 px-4 py-2 border-b  text-sm md:text-base transition-colors min-w-[160px] ${
                  theme === "day"
                    ? "text-black-chocolate border-b-gold-beige"
                    : "text-white border-b-white"
                }`}
              >
                <span>{selectedLocationLabel}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isLocationOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <DropdownMenu
                options={locations}
                selectedValues={selectedLocationsArray}
                isOpen={isLocationOpen}
                onSelect={handleLocationToggle}
                onClose={() => setIsLocationOpen(false)}
                theme={theme}
              />
            </div>

            {/* Property Dropdown */}
            <div ref={propertyRef} className="relative w-full">
              <button
                onClick={() => {
                  setIsPropertyOpen(!isPropertyOpen);
                  setIsLocationOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-2 px-4 py-2 border-b  text-sm md:text-base transition-colors min-w-[160px] ${
                  theme === "day"
                    ? "text-black-chocolate border-b-gold-beige"
                    : "text-white border-b-white"
                }`}
              >
                <span>{selectedPropertyLabel}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isPropertyOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <DropdownMenu
                options={properties}
                selectedValues={selectedPropertiesArray}
                isOpen={isPropertyOpen}
                onSelect={handlePropertyToggle}
                onClose={() => setIsPropertyOpen(false)}
                theme={theme}
              />
            </div>
          </div>

          {/* Day/Night Mode Switcher */}
          <div className="flex items-center gap-3">
            <span
              className={`text-sm md:text-base transition-colors font-medium ${
                theme === "day" ? "text-black " : "text-gray-500"
              }`}
            >
              Day Mode
            </span>
            <button
              onClick={toggleTheme}
              className={`relative w-16 h-6  transition-all focus:outline-none border items-center ${
                theme === "day"
                  ? "bg-[#FFFAF7] border-gold-beige"
                  : "bg-black border-white"
              }`}
              aria-label={`Switch to ${theme === "day" ? "night" : "day"} mode`}
            >
              <span
                className={`absolute top-0.5 h-[18px]  transform transition-all ${
                  theme === "day"
                    ? "left-0.5 w-7 bg-gold-beige"
                    : "right-0.5 w-7 bg-white"
                }`}
              />
            </button>
            <span
              className={`text-sm md:text-base transition-colors font-medium ${
                theme === "night" ? "text-white " : "text-gray-400"
              }`}
            >
              Night Mode
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

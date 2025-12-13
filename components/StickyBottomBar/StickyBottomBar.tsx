"use client";

import { useState, useRef, useEffect } from "react";
import { useThemeStore } from "@/store/themeStore";
import { DropdownMenuProps, StickyBottomBarProps } from "@/interfaces";

const ALL_OPTION = "All";

function DropdownMenu({
  options,
  selectedValues,
  isOpen,
  onSelect,
  // onClose,
  theme,
  showAllOption = true,
  isProperty = false,
}: DropdownMenuProps & { showAllOption?: boolean }) {
  if (!isOpen) return null;

  // Normalize selectedValues to always be an array
  const selectedArray = Array.isArray(selectedValues)
    ? selectedValues
    : selectedValues
      ? [selectedValues]
      : [];

  const isSelected = (value: string) => {
    if (value === ALL_OPTION) {
      return selectedArray.length === 0;
    }
    return selectedArray.includes(value);
  };

  // Combine "All" option with other options
  const allOptions = showAllOption
    ? [ALL_OPTION, ...(options || [])]
    : options || [];

  return (
    <div
      className={`absolute bottom-full md:left-5 ${isProperty ? "-left-20" : "left-0"} mb-2 border border-golden-beige shadow-lg min-w-[260px] max-h-60 overflow-y-auto z-10 ${
        theme === "day" ? "bg-white" : "bg-black"
      }`}
    >
      <ul className="">
        {allOptions.map((option, index) => {
          const selected = isSelected(option);
          const isLast = index === allOptions.length - 1;
          return (
            <li key={option}>
              <button
                onClick={() => {
                  onSelect(option);
                }}
                className={`w-full  text-black-chocolate text-left px-4 py-2 cursor-pointer text-sm transition-colors flex items-center gap-2 
                  ${!isLast ? (theme === "day" ? "border-b border-b-gold-beige" : "border-b border-b-[#4E4E4E]") : ""}
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
                      : "border-black"
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
                {option}
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
  selectedLocation,
  selectedProperty,
  onLocationChange,
  onPropertyChange,
  isVisible = true,
  propertyCities,
  propertyStatuses,
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
        propertyCities?.find((loc) => loc === selectedLocationsArray[0]) ||
        "Select Location"
      );
    }
    return `${selectedLocationsArray.length} selected`;
  };

  const getSelectedPropertyLabel = () => {
    if (selectedPropertiesArray.length === 0) return "Select Project Status";
    if (selectedPropertiesArray.length === 1) {
      return (
        propertyStatuses?.find((prop) => prop === selectedPropertiesArray[0]) ||
        "Select Project Status"
      );
    }
    return `${selectedPropertiesArray.length} selected`;
  };

  const selectedLocationLabel = getSelectedLocationLabel();
  const selectedPropertyLabel = getSelectedPropertyLabel();

  // Toggle selection handler
  const handleLocationToggle = (value: string) => {
    if (value === ALL_OPTION) {
      // Selecting "All" clears the filter
      onLocationChange?.([]);
      return;
    }
    const current = selectedLocationsArray;
    const newSelection = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    // If all items are deselected, treat it as "All"
    onLocationChange?.(newSelection.length === 0 ? [] : newSelection);
  };

  const handlePropertyToggle = (value: string) => {
    if (value === ALL_OPTION) {
      // Selecting "All" clears the filter
      onPropertyChange?.([]);
      return;
    }
    const current = selectedPropertiesArray;
    const newSelection = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    // If all items are deselected, treat it as "All"
    onPropertyChange?.(newSelection.length === 0 ? [] : newSelection);
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 border-t shadow-lg transition-all duration-300 ease-in-out ${
        theme === "day"
          ? "bg-[#FFFAF7] border-gold-beige"
          : "bg-black border-white"
      } ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="container-standard px-4 py-2 md:py-6">
        <div className="flex flex-wrap items-center justify-evenly gap-3 md:gap-8">
          {/* Projects Found Text */}
          <div
            className={`text-sm md:text-base font-medium transition-colors ${
              theme === "day" ? "text-black-chocolate" : "text-white"
            }`}
          >
            {projectCount} Projects Found
          </div>

          {/* Dropdowns Container */}
          <div className="flex flex-row md:flex-row items-center gap-4  justify-center">
            {/* Location Dropdown */}
            <div
              ref={locationRef}
              className="relative md:w-auto md:px-4 cursor-pointer"
            >
              <button
                onClick={() => {
                  setIsLocationOpen(!isLocationOpen);
                  setIsPropertyOpen(false);
                }}
                className={`flex md:w-64 items-center justify-between gap-2 px-4 py-2 border-b  text-sm md:text-base transition-colors min-w-[160px] ${
                  theme === "day"
                    ? "text-black-chocolate border-b-gold-beige"
                    : "text-white border-b-white"
                }`}
              >
                <span className="text-xs md:text-base">
                  {selectedLocationLabel}
                </span>
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
                options={propertyCities}
                selectedValues={selectedLocationsArray}
                isOpen={isLocationOpen}
                onSelect={handleLocationToggle}
                onClose={() => setIsLocationOpen(false)}
                theme={theme}
                isProperty={false}
              />
            </div>

            {/* Property Dropdown */}
            <div
              ref={propertyRef}
              className="relative md:w-auto md:px-4 cursor-pointer"
            >
              <button
                onClick={() => {
                  setIsPropertyOpen(!isPropertyOpen);
                  setIsLocationOpen(false);
                }}
                className={`flex md:w-64 items-center justify-between gap-2 px-4 py-2 border-b  text-sm md:text-base transition-colors min-w-[160px] ${
                  theme === "day"
                    ? "text-black-chocolate border-b-gold-beige"
                    : "text-white border-b-white"
                }`}
              >
                <span className="text-xs md:text-base">
                  {selectedPropertyLabel}
                </span>
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
                options={propertyStatuses}
                selectedValues={selectedPropertiesArray}
                isOpen={isPropertyOpen}
                onSelect={handlePropertyToggle}
                onClose={() => setIsPropertyOpen(false)}
                theme={theme}
                isProperty={true}
              />
            </div>
          </div>

          {/* Day/Night Mode Switcher */}
          <div className="flex items-center gap-3">
            <span
              className={`text-sm md:text-base transition-colors font-regular ${
                theme === "day" ? "text-black " : "text-[rgba(255,255,255,0.5)]"
              }`}
            >
              Day Mode
            </span>
            <button
              onClick={toggleTheme}
              className={`relative cursor-pointer w-12 h-5  transition-all focus:outline-none border items-center ${
                theme === "day"
                  ? "bg-[#FFFAF7] border-gold-beige"
                  : "bg-black border-white"
              }`}
              aria-label={`Switch to ${theme === "day" ? "night" : "day"} mode`}
            >
              <span
                className={`absolute top-0.5 h-[14px]  transform transition-all ${
                  theme === "day"
                    ? "left-0.5 w-5 bg-gold-beige"
                    : "right-0.5 w-5 bg-white"
                }`}
              />
            </button>
            <span
              className={`text-sm md:text-base transition-colors font-display-regular ${
                theme === "night" ? "text-white " : "text-[rgba(0,0,0,0.5)]"
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

"use client";

import { useNavigationMenuStore } from "@/store/navigationMenuStore";

export function useNavigationMenu() {
  const navigationMenu = useNavigationMenuStore(
    (state) => state.navigationMenu
  );
  return navigationMenu;
}

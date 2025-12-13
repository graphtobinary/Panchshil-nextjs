import { create } from "zustand";
import { NavigationMenuProps, ContactDetailsProps } from "@/interfaces";

interface NavigationMenuState {
  navigationMenu: NavigationMenuProps[];
  contactDetails: ContactDetailsProps;
  setNavigationMenu: (menu: NavigationMenuProps[]) => void;
  setContactDetails: (details: ContactDetailsProps) => void;
}

export const useNavigationMenuStore = create<NavigationMenuState>((set) => ({
  navigationMenu: [],
  contactDetails: [],
  setNavigationMenu: (menu: NavigationMenuProps[]) =>
    set({ navigationMenu: menu }),
  setContactDetails: (details: ContactDetailsProps) =>
    set({ contactDetails: details }),
}));

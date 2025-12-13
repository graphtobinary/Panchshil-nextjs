"use client";

import { useEffect, ReactNode } from "react";
import { useNavigationMenuStore } from "@/store/navigationMenuStore";
import { NavigationMenuProps, ContactDetailsProps } from "@/interfaces";

interface NavigationMenuProviderProps {
  children: ReactNode;
  initialNavigationMenu: NavigationMenuProps[];
  initialContactDetails: ContactDetailsProps;
}

export const NavigationMenuProvider = ({
  children,
  initialNavigationMenu,
  initialContactDetails,
}: NavigationMenuProviderProps) => {
  const setNavigationMenu = useNavigationMenuStore(
    (state) => state.setNavigationMenu
  );
  const setContactDetails = useNavigationMenuStore(
    (state) => state.setContactDetails
  );

  useEffect(() => {
    if (initialNavigationMenu && initialNavigationMenu.length > 0) {
      setNavigationMenu(initialNavigationMenu);
    }
  }, [initialNavigationMenu, setNavigationMenu]);

  useEffect(() => {
    if (initialContactDetails && initialContactDetails.length > 0) {
      setContactDetails(initialContactDetails);
    }
  }, [initialContactDetails, setContactDetails]);

  return <>{children}</>;
};

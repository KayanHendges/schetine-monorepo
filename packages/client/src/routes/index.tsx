"use client";
import { AuthContext } from "@contexts/authContext";
import { usePathname } from "next/navigation";
import {
  AddressBook,
  CalendarBlank,
  Gear,
  House,
  SignOut,
  Storefront,
} from "phosphor-react";
import { useContext } from "react";

export default function useClientRoutes() {
  const { logOut } = useContext(AuthContext);
  const pathname = usePathname();

  const routerItems: RouteItem[] = [
    {
      label: "Home",
      path: "/home",
      icon: <House />,
      sidebarType: "Item",
    },
    {
      label: "Agendamentos",
      path: "/appointments",
      icon: <CalendarBlank />,
      sidebarType: "Item",
    },
    {
      label: "Espaços",
      path: "/business",
      icon: <Storefront />,
      sidebarType: "Item",
    },
    {
      label: "Clientes",
      path: "/clients",
      icon: <AddressBook />,
      sidebarType: "Item",
    },
    {
      label: "Configurações",
      path: "/settings",
      icon: <Gear />,
      sidebarType: "smallItem",
    },
    {
      label: "Sair",
      icon: <SignOut />,
      action: () => logOut(),
      sidebarType: "smallItem",
    },
  ];

  const currentRoute = routerItems.find((route) =>
    route?.path?.startsWith(pathname)
  );

  return { routerItems, currentRoute };
}

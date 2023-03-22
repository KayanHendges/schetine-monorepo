import { AuthContext } from "@contexts/authContext";
import { useRouter } from "next/router";
import {
  AddressBook,
  CalendarBlank,
  Gear,
  House,
  SignOut,
  Storefront,
} from "phosphor-react";
import { useContext } from "react";

export default function useCientRoutes() {
  const { logOut } = useContext(AuthContext);
  const router = useRouter();

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
    route.path.startsWith(router.pathname)
  );

  return { routerItems, currentRoute };
}

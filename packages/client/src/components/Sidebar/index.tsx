import Avatar from "@components/Sidebar/Avatar";
import { fullNameInitials } from "@components/Sidebar/helpers";
import { Text } from "@components/Texts/Text";
import { ProfessionalContext } from "@contexts/professionalContext";
import clsx from "clsx";
import { useContext, useState } from "react";
import SelectBusiness from "@components/Selects/Business/Index";
import { Item } from "@components/Item";
import {
  AddressBook,
  CalendarBlank,
  Gear,
  House,
  SignOut,
  Storefront,
} from "phosphor-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Slot } from "@radix-ui/react-slot";
import { AuthContext } from "@contexts/authContext";

interface RouteItem {
  label: string;
  path?: string;
  action?: () => void;
  icon: JSX.Element;
}

export default function SideBar() {
  const { logOut } = useContext(AuthContext);

  const [retract, setRetract] = useState<boolean>(true);
  const [retractEnd, setRetractEnd] = useState<boolean>(true);
  const onSideBarTransition = retract !== retractEnd;
  const transitionMs = 300;

  const router = useRouter();
  const { professional, currentBusinessForm } = useContext(ProfessionalContext);
  const currentBusiness = currentBusinessForm.getValues();

  const routerItens: RouteItem[] = [
    {
      label: "Home",
      path: "/home",
      icon: <House />,
    },
    {
      label: "Agendamentos",
      path: "/appointments",
      icon: <CalendarBlank />,
    },
    {
      label: "Espaços",
      path: "/business",
      icon: <Storefront />,
    },
    {
      label: "clientes",
      path: "/clients",
      icon: <AddressBook />,
    },
  ];

  const routerSmallItens: RouteItem[] = [
    {
      label: "Configurações",
      path: "/settings",
      icon: <Gear />,
    },
    {
      label: "Sair",
      action: () => logOut(),
      icon: <SignOut />,
    },
  ];

  const openSidebar = () => {
    setRetract(false);
    setTimeout(() => {
      setRetractEnd(false);
    }, transitionMs);
  };

  const retractSidebar = () => {
    setRetract(true);
    setTimeout(() => {
      setRetractEnd(true);
    }, transitionMs);
  };

  const line = (
    <span
      className={clsx(
        "w-full h-px rounded",
        retract ? "bg-gray-700" : "bg-gray-600"
      )}
    />
  );

  return (
    <div
      className={clsx(
        retract ? "w-20 py-6 px-3" : "w-80 p-6",
        "max-w-1/2 h-full flex flex-col justify-start items-center",
        "gap-6 overflow-hidden transition-all"
      )}
      onMouseEnter={() => openSidebar()}
      onMouseLeave={() => retractSidebar()}
    >
      {professional && (
        <div className="w-full flex flex-col items-center gap-4">
          <div
            className={clsx("w-full flex items-center justify-center gap-2")}
          >
            <Avatar>
              <Text size="xl" className="font-light">
                {fullNameInitials(professional.name)}
              </Text>
            </Avatar>
            {!retract && (
              <Text
                className={clsx(
                  "flex-1 transition-opacity",
                  retract ? "opacity-0" : "opacity-100"
                )}
              >
                {professional.name}
              </Text>
            )}
          </div>
          {retract && (
            <Text
              size="xl"
              className="h-12 w-12 flex justify-center text-center items-center text-white"
            >
              {fullNameInitials(currentBusiness?.name || "")}
            </Text>
          )}
          {!retract && <SelectBusiness formHook={currentBusinessForm} />}
        </div>
      )}
      {line}
      <div className="w-full flex flex-col justify-start items-center gap-2">
        {routerItens.map(({ icon, label, path }) => {
          const selected = router.pathname.startsWith(path);
          return (
            <Item.Root
              key={path}
              className={clsx("w-full", retract && "justify-center")}
              selected={selected}
              onClick={() => router.pathname !== path && router.push(path)}
            >
              <Item.Icon selected={selected}>{icon}</Item.Icon>
              {!retract && (
                <Item.Text
                  selected={selected}
                  size={"sm"}
                  className={clsx(
                    "transition-opacity",
                    onSideBarTransition
                      ? "opacity-0 hidden"
                      : "opacity-100 flex"
                  )}
                >
                  {label}
                </Item.Text>
              )}
            </Item.Root>
          );
        })}
      </div>
      {line}
      <div className="flex w-full flex-col px-4 gap-4">
        {routerSmallItens.map(({ icon, label, path, action }) => {
          const Wrapper = path ? Link : Slot;
          return (
            <Wrapper
              key={label}
              onClick={() => action && action()}
              {...(path ? { href: path } : {})}
            >
              <div
                className={clsx(
                  "group w-fit flex justify-start items-center gap-4",
                  "cursor-pointer text-gray-400 hover:text-white transition-opacity",
                  retract || onSideBarTransition ? "opacity-0" : "opacity-100"
                )}
              >
                <Slot>{icon}</Slot>
                <Text
                  size="sm"
                  className="text-gray-400 group group-hover:text-white"
                >
                  {label}
                </Text>
              </div>
            </Wrapper>
          );
        })}
      </div>
    </div>
  );
}
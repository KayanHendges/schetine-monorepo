import Avatar from "@components/Sidebar/Avatar";
import { fullNameInitials } from "@components/Sidebar/helpers";
import { Text } from "@components/Texts/Text";
import { ProfessionalContext } from "@contexts/professionalContext";
import clsx from "clsx";
import { useContext, useState } from "react";
import SelectBusiness from "@components/Selects/Business/Index";

export default function SideBar() {
  const [retract, setRetract] = useState<boolean>(true);
  const [retractEnd, setRetractEnd] = useState<boolean>(true);
  const onSideBarTransition = retract !== retractEnd;
  const transitionMs = 300;

  const { professional, currentBusinessForm } = useContext(ProfessionalContext);
  const currentBusiness = currentBusinessForm.getValues();

  const openSidebar = () => {
    setRetract(false);
    setTimeout(() => {
      setRetractEnd(false);
    }, transitionMs);
  };

  const retractSidebar = () => {
    setRetract(false);
    setTimeout(() => {
      setRetractEnd(false);
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
      {line}
    </div>
  );
}

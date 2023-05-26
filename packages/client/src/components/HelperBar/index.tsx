import ListBar from "@components/HelperBar/ListBar";
import { HelperBarContext } from "@contexts/helperBarContext";
import clsx from "clsx";
import { useContext } from "react";

interface Props {
  customHelper: JSX.Element | null;
  renderListBar: boolean;
  setRenderListBar: SetState<boolean>;
  isCustomHelperOpen: boolean;
  setIsCustomHelperOpen: SetState<boolean>;
}

export default function HelperBar({
  customHelper,
  isCustomHelperOpen,
  renderListBar,
}: Props) {
  const { isOpen } = useContext(HelperBarContext);

  return (
    <div
      className={clsx(
        "h-full max-w-md transition-all relative overflow-hidden",
        isOpen ? "flex-1 min-w-fit mr-3" : "flex-none"
      )}
    >
      {(isOpen || renderListBar) && (
        <div
          className={clsx("w-full h-full absolute z-0 transition-all", {
            "translate-y-full": isOpen && !renderListBar,
          })}
        >
          <ListBar />
        </div>
      )}
      {(customHelper || isCustomHelperOpen) && (
        <div
          className={clsx(
            "flex w-full h-full flex-col z-10",
            "absolute overflow-auto",
            "bg-neutral-750 rounded-t-2xl mr-3 transition-all",
            { "translate-y-full": isOpen && !isCustomHelperOpen }
          )}
        >
          {customHelper}
        </div>
      )}
    </div>
  );
}

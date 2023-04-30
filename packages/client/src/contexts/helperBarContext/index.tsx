import { sleep } from "@utils/promises";
import { createContext, useState } from "react";
import HelperBar from "@components/HelperBar";

export const HelperBarContext = createContext({} as IHelperBarContex);

export function HelperBarProvider({ children }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [renderListBar, setRenderListBar] = useState<boolean>(false);

  const [customHelper, setCustomHelper] = useState<JSX.Element | null>(null);
  const [isCustomHelperOpen, setIsCustomHelperOpen] =
    useState<boolean | null>(false);

  const transitionMs = 150;

  const initCustomHelper = async (element: JSX.Element) => {
    setCustomHelper(element);
    if (!isOpen) {
      setIsOpen(true);
      await sleep(transitionMs);
    }
    setIsCustomHelperOpen(true);
  };

  const closeCustomHelper = async () => {
    setIsCustomHelperOpen(false);
    setCustomHelper(null);
    if (!renderListBar) {
      await sleep(transitionMs);
      setIsOpen(false);
    }
  };

  const open = async () => {
    setIsOpen(true);
    await sleep(transitionMs);
    setRenderListBar(true);
  };

  const close = async () => {
    if (customHelper || renderListBar) {
      setIsCustomHelperOpen(false);
      setRenderListBar(false);
      await sleep(transitionMs);
      setCustomHelper(null);
    }

    setIsOpen(false);
  };

  return (
    <HelperBarContext.Provider
      value={{
        isOpen,
        initCustomHelper,
        closeCustomHelper,
        open,
        close,
      }}
    >
      {children}
      <HelperBar
        customHelper={customHelper}
        renderListBar={renderListBar}
        setRenderListBar={setRenderListBar}
        isCustomHelperOpen={isCustomHelperOpen}
        setIsCustomHelperOpen={setIsCustomHelperOpen}
      />
    </HelperBarContext.Provider>
  );
}

import { keyboardMenuHandler } from "@components/Selects/SingleSelect/types";

export const keyboardMapFunctions: Record<
  string,
  (event: keyboardMenuHandler) => void
> = {
  ArrowUp: ({ hoverItem, setHoverItem }) => {
    if (hoverItem === 0 || hoverItem === null) setHoverItem(null);
    else setHoverItem(hoverItem - 1);
  },
  ArrowDown: ({ hoverItem, setHoverItem, optionsLength }) => {
    if (hoverItem === null) setHoverItem(0);
    else if (hoverItem === optionsLength - 1) setHoverItem(0);
    else setHoverItem(hoverItem + 1);
  },
  Enter: ({ setSelectedOption, isMenuOpen }) => {
    isMenuOpen && setSelectedOption();
  },
  Tab: ({ isMenuOpen, setIsMenuOpen }) => {
    if (isMenuOpen) setIsMenuOpen(false);
  },
};

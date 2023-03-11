import { keyboardMenuHandler } from "@components/Inputs/Select/types";

export const keyboardMapFunctions: Record<
  string,
  (event: keyboardMenuHandler) => void
> = {
  ArrowUp: ({ hoverIndex, setHoverIndex }) => {
    if (hoverIndex === 0 || hoverIndex === null) setHoverIndex(null);
    else setHoverIndex(hoverIndex - 1);
  },
  ArrowDown: ({ hoverIndex, setHoverIndex, optionsLength }) => {
    if (hoverIndex === null) setHoverIndex(0);
    else if (hoverIndex === optionsLength - 1) setHoverIndex(0);
    else setHoverIndex(hoverIndex + 1);
  },
  Enter: ({ hoverIndex, setSelectedOption }) =>
    hoverIndex !== null && setSelectedOption(),
  Tab: ({ open, setOpen }) => {
    if (open) setOpen(false);
  },
};

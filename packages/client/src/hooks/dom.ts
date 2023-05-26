import { MutableRefObject, useEffect } from "react";

interface OutsideClickProps {
    ref: MutableRefObject<any>;
    onClickInside?: (event: MouseEvent) => void;
    onClickOutside?: (event: MouseEvent) => void;
}

export function useComponentClick({ ref, onClickInside, onClickOutside }: OutsideClickProps) {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target)) onClickOutside && onClickOutside(event)
        else onClickInside && onClickInside(event)
      }
      document.addEventListener("mousedown", handleClickOutside);

      return () => 
        document.removeEventListener("mousedown", handleClickOutside);
      
    }, [onClickInside, onClickOutside, ref]);
  }
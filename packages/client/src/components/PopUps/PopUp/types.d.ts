import { HTMLAttributes } from "react";

interface PopUpProps extends HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
  close: () => void;
}

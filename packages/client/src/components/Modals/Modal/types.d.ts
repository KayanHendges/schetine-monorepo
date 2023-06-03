import { HTMLAttributes } from "react";

interface ModalRootProps extends HTMLAttributes<HTMLDivElement> {
  size?: "auto" | "xs" | "sm" | "md" | "lg" | "full";
  onClose: () => void;
}

interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
}

interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "sm" | "md" | "lg";
}

interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  borderTop?: boolean;
}

interface ModalFooterButtonProps extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  dangerous?: boolean;
  isLoading?: boolean;
}

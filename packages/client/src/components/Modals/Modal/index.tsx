import CircularLoader from "@components/Loaders/CircularLoader";
import {
  ModalBodyProps,
  ModalFooterButtonProps,
  ModalFooterProps,
  ModalHeaderProps,
  ModalRootProps,
} from "@components/Modals/Modal/types";
import { Heading } from "@components/Texts/Heading";
import { useComponentClick } from "@hooks/dom";
import { sleep } from "@utils/promises";
import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";

function ModalRoot({
  size = "auto",
  children,
  className,
  onClose,
  ...props
}: ModalRootProps) {
  const [isOpenState, setIsOpenState] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useComponentClick({
    ref: modalRef,
    onClickOutside: (e) => {
      e.preventDefault();
      isOpenState && closeModal();
    },
  });

  const openModal = useCallback(async () => {
    await sleep(1);
    setIsOpenState(true);
  }, []);

  const closeModal = async () => {
    setIsOpenState(false);
    await sleep(300);
    onClose();
  };

  useEffect(() => {
    openModal();
  }, [openModal]);

  return (
    <div
      className={clsx(
        "w-screen h-screen absolute top-0 left-0 z-20",
        "flex flex-col items-center justify-center p-4",
        "bg-black transition-opacity overflow-hidden",
        {
          "bg-opacity-50 opacity-100": isOpenState,
          "bg-opacity-0 opacity-0": !isOpenState,
        }
      )}
    >
      <div
        className={clsx(
          "max-w-full max-h-full",
          "flex flex-col rounded-2xl",
          "bg-neutral-800 overflow-hidden transition-all",
          {
            "scale-50 opacity-0": !isOpenState,
            "w-96 h-72": size === "xs",
            "w-2/4 h-2/5": size === "sm",
            "w-2/3 h-2/4": size === "md",
            "w-5/6 h-4/5": size === "lg",
            "w-full h-full": size === "full",
          },
          className
        )}
        {...props}
        ref={modalRef}
      >
        {children}
      </div>
    </div>
  );
}

function ModalHeader({
  title,
  children,
  className,
  ...props
}: ModalHeaderProps) {
  return (
    <div className={clsx("w-full p-3 bg-neutral-900", className)} {...props}>
      {title && <Heading size="sm">{title}</Heading>}
      {children}
    </div>
  );
}

function ModalBody({
  padding = "md",
  children,
  className,
  ...props
}: ModalBodyProps) {
  return (
    <div
      className={clsx(
        "w-full flex-1 p-4 overflow-y-auto overflow-x-hidden",
        {
          "p-4": padding === "sm",
          "p-6": padding === "md",
          "p-8": padding === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function ModalFooter({
  borderTop = true,
  children,
  className,
  ...props
}: ModalFooterProps) {
  return (
    <div
      className={clsx(
        "w-full flex",
        { "border-t-2 border-t-neutral-900": borderTop },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function ModalFooterButton({
  disabled,
  dangerous,
  isLoading,
  children,
  className,
  ...props
}: ModalFooterButtonProps) {
  return (
    <button
      type="button"
      className={clsx(
        "flex-1 p-2 hover:text-white focus:text-white transition-colors disabled:cursor-not-allowed",
        {
          "hover:bg-neutral-700 focus:bg-neutral-700": !disabled,
          "hover:bg-red-500 focus:bg-red-500": dangerous,
        },
        className
      )}
      {...props}
      {...(disabled || isLoading
        ? { onSubmit: undefined, onClick: undefined, disabled: true }
        : {})}
    >
      {isLoading ? <CircularLoader /> : children}
    </button>
  );
}

export const Modal = {
  Root: ModalRoot,
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
  FooterButton: ModalFooterButton,
};

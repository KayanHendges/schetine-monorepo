import { TextInput } from "@components/Inputs/Text/InputText";
import CircularLoader from "@components/Loaders/CircularLoader";
import { keyboardMapFunctions } from "@components/Selects/SingleSelect/helper";
import {
  ISingleSelectContext,
  SingleSelectInputProps,
  SingleSelectItemProps,
  SingleSelectMenuProps,
  SingleSelectRootProps,
} from "@components/Selects/SingleSelect/types";
import { Text } from "@components/Texts/Text";
import useWindowSize, { useComponentClick } from "@hooks/dom";
import clsx from "clsx";
import { CaretDown } from "phosphor-react";
import {
  KeyboardEvent,
  MouseEvent,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export const SingleSelectContext = createContext(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  {} as ISingleSelectContext<any>
);

function SingleSelectRoot<T>({
  children,
  className,
  validation,
  ...props
}: SingleSelectRootProps<T>) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [hoverItem, setHoverItem] = useState<number | null>(null);

  const handleRootClick = (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    const target = event.target as ChildNode;
    if (target?.nodeName === "INPUT") return setIsMenuOpen(true);
    const children = target.childNodes;
    children.forEach((child) => {
      if (child.nodeName === "INPUT") {
        const input = child as HTMLInputElement;
        input.focus();
      }
    });
  };

  return (
    <SingleSelectContext.Provider
      value={{ ...props, hoverItem, setHoverItem, isMenuOpen, setIsMenuOpen }}
    >
      <TextInput.Root
        className={clsx("relative", className)}
        onClick={handleRootClick}
        validation={validation}
      >
        {children}
        {props.isLoading ? (
          <CircularLoader />
        ) : (
          <TextInput.Icon className={isMenuOpen ? "rotate-180 text-white" : ""}>
            <CaretDown />
          </TextInput.Icon>
        )}
      </TextInput.Root>
    </SingleSelectContext.Provider>
  );
}

function SingleSelectInput(props: SingleSelectInputProps) {
  const {
    isMenuOpen,
    renderValue,
    selectedValue,
    onSelectedValue,
    setIsMenuOpen,
    hoverItem,
    setHoverItem,
    identifierKey,
    options,
    notAllowNull,
    inputValue,
    onInputChanges,
  } = useContext(SingleSelectContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const isValueHidden = isMenuOpen || !selectedValue;

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    const handler = keyboardMapFunctions[key];
    const selectedIndex = options.findIndex(
      (opt) => opt[identifierKey] === selectedValue[identifierKey]
    );
    const alreadySelected = hoverItem === selectedIndex;

    if (handler && identifierKey) {
      handler({
        hoverItem,
        setHoverItem,
        optionsLength: options.length,
        isMenuOpen,
        setIsMenuOpen,
        setSelectedOption: () => {
          if (alreadySelected) {
            if (!notAllowNull) onSelectedValue(null);
          } else {
            const index = hoverItem ?? selectedIndex;
            const option = options[index];
            if (option) onSelectedValue(option);
          }

          setIsMenuOpen(false);
        },
      });
      event.preventDefault();
    } else {
      setHoverItem(0);
      setIsMenuOpen(true);
    }
    return event;
  };

  const handleKeyDownHidden = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (["ArrowDown"].includes(key)) setIsMenuOpen(true);
  };

  useEffect(() => {
    if (isMenuOpen && inputRef.current) inputRef.current.focus();
  }, [isMenuOpen]);

  return (
    <>
      <TextInput.Input
        {...props}
        ref={inputRef}
        hidden={!isValueHidden}
        value={inputValue}
        onChange={(e) => {
          props.onChange && props.onChange(e);
          onInputChanges(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsMenuOpen(true)}
      />
      <TextInput.Input
        hidden={isValueHidden}
        onChange={() => setIsMenuOpen(true)}
        value={selectedValue ? renderValue(selectedValue) : ""}
        onKeyDown={handleKeyDownHidden}
      />
    </>
  );
}

function SingleSelectItem<T>({
  className,
  children,
  value,
  ...props
}: SingleSelectItemProps<T>) {
  const {
    selectedValue,
    onSelectedValue,
    setIsMenuOpen,
    identifierKey,
    hoverItem,
    options,
  } = useContext<ISingleSelectContext<T>>(SingleSelectContext);

  const itemRef = useRef<HTMLButtonElement>(null);

  const isSelected =
    selectedValue && selectedValue[identifierKey] === value[identifierKey];
  const itemIndex = options.findIndex(
    (opt) => opt[identifierKey] === value[identifierKey]
  );
  const isHovered = itemIndex !== undefined && itemIndex === hoverItem;

  const handleOnSelect = () => {
    onSelectedValue(isSelected ? null : value);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isHovered && itemRef.current)
      itemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
  }, [isHovered]);

  return (
    <button
      ref={itemRef}
      className={clsx(
        "flex-1 w-full text-center",
        "p-2 rounded cursor-pointer",
        {
          "bg-indigo-400 text-white": isSelected,
          "hover:bg-neutral-700 hover:text-white": !isSelected,
          "bg-neutral-700 text-white": !isSelected && isHovered,
        },
        className
      )}
      {...props}
      type="button"
      onClick={(e) => {
        props.onClick && props?.onClick(e);
        handleOnSelect();
      }}
    >
      {children}
    </button>
  );
}

function SingleSelectMenu({
  emptyListMessage = "Nenhuma opção encontrada.",
  children,
  className,
  ...props
}: SingleSelectMenuProps) {
  const {
    isMenuOpen,
    setIsMenuOpen,
    options,
    renderValue,
    identifierKey,
    isLoading,
  } = useContext(SingleSelectContext);
  const menuRef = useRef<HTMLDivElement>(null);
  const { height } = useWindowSize();

  useComponentClick({
    ref: menuRef,
    onClickOutside: (e) => {
      e.preventDefault();
      setIsMenuOpen(false);
    },
  });

  useEffect(() => {
    if (isMenuOpen && menuRef.current) {
      const { innerHeight } = window;
      const { top } = menuRef.current.getBoundingClientRect();
      const height = innerHeight - top - 10;

      menuRef.current.style.maxHeight = `${height}px`;
    }
  }, [isMenuOpen, height]);

  if (!isMenuOpen) return <></>;

  return (
    <div
      ref={menuRef}
      className={clsx(
        "w-full flex flex-col justify-start items-center absolute",
        "p-1 top-14 left-0 bg-neutral-900 rounded",
        "overflow-auto",
        "scrollbar-thin scrollbar-track-transparent",
        "scrollbar-thumb-neutral-800",
        className
      )}
      {...props}
      onBlur={(e) => {
        props.onBlur && props.onBlur(e);
        setIsMenuOpen(false);
      }}
    >
      {children}
      {!options.length && <Text>{emptyListMessage}</Text>}
      {isLoading && <Text>Buscando...</Text>}
      {!isLoading &&
        options.map((opt) => (
          <SingleSelectItem value={opt} key={opt[identifierKey]}>
            {renderValue(opt)}
          </SingleSelectItem>
        ))}
    </div>
  );
}

export const SingleSelect = {
  Root: SingleSelectRoot,
  Input: SingleSelectInput,
  Menu: SingleSelectMenu,
  Item: SingleSelectItem,
};

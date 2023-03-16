import {
  BaseSyntheticEvent,
  KeyboardEvent,
  MouseEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import { CaretDown } from "phosphor-react";
import { Item } from "@components/Item";
import { Text } from "@components/Texts/Text";
import { keyboardMapFunctions } from "@components/Inputs/Select/helpers";
import {
  InputMenuProps,
  MenuItem,
  SelectProps,
} from "@components/Inputs/Select/types";
import { TextInput } from "@components/Inputs/Text/InputText";

export function SelectInput<T = any>({
  leftIcon,
  validation,
  register,
  isDropdownOpen,
  options,
  renderLabel,
  selectedOption,
  onSelectOption,
  optionKey,
  allowNull = true,
}: SelectProps<T>) {
  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const matchOptions = options.filter((opt) =>
    renderLabel(opt.value).includes(inputValue)
  );
  const selectedIndex =
    matchOptions.findIndex(
      (opt) => opt.value[optionKey] === selectedOption[optionKey]
    ) ?? null;

  const handleSelectedOption = (option: T | null) => {
    const alreadySelected = selectedOption[optionKey] === option[optionKey];
    onSelectOption(allowNull && alreadySelected ? null : option);
    setOpen(false);
    setHoverIndex(null);
  };

  const handleKeyboardEvent = (event: KeyboardEvent<HTMLDivElement>) => {
    const { key } = event;
    const handler = keyboardMapFunctions[key];

    if (handler)
      handler({
        hoverIndex,
        setHoverIndex,
        optionsLength: options.length,
        open,
        setOpen,
        setSelectedOption: () => {
          const option = options[hoverIndex || selectedIndex];
          handleSelectedOption(option?.value || null);
          setInputValue(renderLabel(option?.value) || "");
        },
      });
    else {
      setHoverIndex(0);
      setOpen(true);
    }
  };

  const handleRootClick = (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    const target = event.target as ChildNode;
    if (target?.nodeName === "INPUT") return setOpen(true);
    const children = target.childNodes;
    children.forEach((child) => {
      if (child.nodeName === "INPUT") {
        const input = child as HTMLInputElement;
        input.focus();
      }
    });
  };

  useEffect(() => {
    if (typeof isDropdownOpen !== "undefined") setOpen(isDropdownOpen);
  }, [isDropdownOpen]);

  return (
    <TextInput.Root
      onClick={(e) => handleRootClick(e)}
      onFocus={() => setOpen(true)}
      className={clsx(
        "group flex items-center gap-3 h-12 py-4 px-3 rounded  bg-gray-800 w-full relative",
        {
          "ring-2 ring-red-500": validation === "error",
          "focus-within:ring-2 ring-indigo-400 transition": !validation,
        }
      )}
    >
      {leftIcon && <TextInput.Icon>{leftIcon}</TextInput.Icon>}
      <TextInput.Input
        onKeyDown={handleKeyboardEvent}
        register={register}
        onChange={({ target }) => setInputValue(target.value)}
        value={
          !open && selectedOption ? renderLabel(selectedOption) : inputValue
        }
      />
      <TextInput.Icon className={open ? "rotate-180 text-white" : ""}>
        <CaretDown />
      </TextInput.Icon>
      {open && (
        <Menu
          open={open}
          setOpen={setOpen}
          handleSelectOption={handleSelectedOption}
          hoverIndex={hoverIndex}
          selectedIndex={selectedIndex}
          options={matchOptions}
          renderLabel={renderLabel}
        />
      )}
    </TextInput.Root>
  );
}

function Menu<T>({
  options,
  renderLabel,
  handleSelectOption,
  hoverIndex,
  selectedIndex,
  open,
  setOpen,
}: InputMenuProps<T>) {
  const [canClose, setCanClose] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const onClickMouseEvent = useCallback(
    (event: globalThis.MouseEvent) => {
      if (!canClose) return setCanClose(true);
      const { target } = event;
      const contains = target && menuRef.current?.contains(target as Node);
      !contains && open && setOpen(false);
    },
    [canClose, open, setOpen]
  );

  useEffect(() => {
    if (!menuRef.current) return;

    window.addEventListener("click", onClickMouseEvent);

    return () => window.removeEventListener("click", onClickMouseEvent);
  }, [menuRef, onClickMouseEvent, open]);

  return (
    <div
      ref={menuRef}
      onBlur={() => setOpen(false)}
      className={clsx(
        "w-full flex flex-col justify-start items-center absolute",
        "p-1 top-14 left-0 bg-gray-900 rounded"
      )}
    >
      {options.map(({ key, value, element }, index) => {
        const hover = index === hoverIndex;
        const selected = index === selectedIndex;
        return (
          <div
            key={key}
            className="flex w-full flex-1"
            onClick={() => handleSelectOption(value)}
          >
            {element || (
              <Item.Root
                selected={selected}
                className={clsx({
                  "bg-gray-700": hover && !selected,
                })}
              >
                <Item.Text selected={selected}>{renderLabel(value)}</Item.Text>
              </Item.Root>
            )}
          </div>
        );
      })}
    </div>
  );
}

function MenuItem({ children, hover, selected }: MenuItem) {
  return (
    <Item.Root
      className={clsx({
        "bg-gray-700": hover && !selected,
        "bg-gray-600 hover:bg-gray-600": selected,
      })}
    >
      <Text
        size="sm"
        className={clsx({ "text-white": selected }, "transition-all")}
      >
        {children}
      </Text>
    </Item.Root>
  );
}

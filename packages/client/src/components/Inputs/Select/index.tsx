import {
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import { CaretDown } from "phosphor-react";
import { Item } from "@components/Items/Default";
import { Text } from "@components/Texts/Text";
import { keyboardMapFunctions } from "@components/Inputs/Select/helpers";
import { InputMenuProps, SelectProps } from "@components/Inputs/Select/types";
import { TextInput } from "@components/Inputs/Text/InputText";

export function SelectInput<T = any>({
  leftIcon,
  validation,
  isDropdownOpen,
  options,
  renderLabel,
  selectedOption,
  onSelectOption,
  placeholder = "",
  optionKey,
  allowNull = true,
  emptyListMessage = "Nenhum resultado encontrado.",
  formRef,
}: SelectProps<T>) {
  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const matchOptions = options.filter((opt) =>
    renderLabel(opt.value)
      .toLowerCase()
      .includes(inputValue.toLocaleLowerCase())
  );
  const selectedIndex = selectedOption
    ? matchOptions.findIndex(
        (opt) => opt.value[optionKey] === selectedOption[optionKey]
      ) ?? null
    : null;

  const handleSelectedOption = (option: T | null) => {
    const alreadySelected =
      option && selectedOption[optionKey] === option[optionKey];

    const optionToSave = !option && !allowNull ? selectedOption : option;
    onSelectOption(allowNull && alreadySelected ? null : optionToSave);
    setInputValue(
      allowNull && alreadySelected ? "" : renderLabel(optionToSave)
    );
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
          const option = matchOptions[hoverIndex ?? selectedIndex];
          handleSelectedOption(option?.value || null);
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
      validation={validation}
      className={clsx(
        "group flex items-center gap-3 h-12 py-4 px-3 rounded  bg-gray-800 w-full relative"
      )}
    >
      {leftIcon && <TextInput.Icon>{leftIcon}</TextInput.Icon>}
      <TextInput.Input
        onKeyDown={handleKeyboardEvent}
        placeholder={placeholder}
        register={
          formRef?.register ? formRef.register(formRef.name) : undefined
        }
        onChange={({ target }) => setInputValue(target.value)}
        value={
          (!open && selectedOption
            ? renderLabel(selectedOption)
            : inputValue) || ""
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
          emptyListMessage={emptyListMessage}
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
  emptyListMessage,
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

  const isEmptyList = !options.length;

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
      {isEmptyList && (
        <Text className="flex items-center h-8" size="sm">
          {emptyListMessage}
        </Text>
      )}
      {!isEmptyList &&
        options.map(({ key, value, element }, index) => {
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
                  <Item.Text selected={selected}>
                    {renderLabel(value)}
                  </Item.Text>
                </Item.Root>
              )}
            </div>
          );
        })}
    </div>
  );
}

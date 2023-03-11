import { KeyboardEvent, useEffect, useState } from "react";
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
  const selectedIndex =
    options.findIndex(
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
        setSelectedOption: () =>
          handleSelectedOption(options[hoverIndex]?.value || null),
      });
  };

  useEffect(() => {
    if (typeof isDropdownOpen !== "undefined") setOpen(isDropdownOpen);
  }, [isDropdownOpen]);

  return (
    <TextInput.Root
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
          options={options.filter((opt) =>
            renderLabel(opt.value).includes(inputValue)
          )}
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
  return (
    <div
      onBlur={() => setOpen(false)}
      className={clsx(
        "w-full flex flex-col justify-start items-center absolute",
        "top-14 left-0 bg-gray-900 ring-1 ring-indigo-300 rounded"
      )}
    >
      {options.map(({ key, value, element }, index) => {
        return (
          <div
            key={key}
            className="flex w-full flex-1"
            onClick={() => handleSelectOption(value)}
          >
            {element || (
              <MenuItem
                selected={index === selectedIndex}
                hover={index === hoverIndex}
              >
                {renderLabel(value)}
              </MenuItem>
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

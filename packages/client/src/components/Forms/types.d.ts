import {  HTMLAttributes } from "react";

interface FormProps<T = Record<string, any>> extends HTMLAttributes<HTMLFormElement> {
    formHook: UseFormReturn<T>;
    handleSubmit?: () => void;
    isLoading?: boolean;
}

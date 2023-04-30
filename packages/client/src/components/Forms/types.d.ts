import {  HTMLAttributes } from "react";

interface FormProps extends HTMLAttributes<HTMLFormElement> {
    handleSubmit?: () => void;
    isLoading?: boolean;
}

import { HTMLAttributes } from "react";

type IconBoxSize = "sm" | "md" | "lg"

interface IconBoxProps extends HTMLAttributes<HTMLDivElement>{
    size?: IconBoxSize
}
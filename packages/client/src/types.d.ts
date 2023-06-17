/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from "react";

type SetState<T = any> = Dispatch<SetStateAction<T>>;

type UseState<T = any> = [T, SetState<T>];

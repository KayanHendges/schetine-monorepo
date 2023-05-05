type SetState<T = any> = Dispatch<SetStateAction<T>>

type UseState<T = any> = [T, SetState<T>] 
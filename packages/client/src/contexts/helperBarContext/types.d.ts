interface IHelperBarContex {
    isOpen: boolean
    initCustomHelper: (element: JSX.Element) => void;
    closeCustomHelper: () => void;
    open: () => void;
    close: () => void;
}
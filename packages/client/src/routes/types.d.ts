interface RouteItem {
  label: string;
  path?: string;
  action?: () => void;
  icon: JSX.Element;
  sidebarType?: "Item" | "smallItem";
}

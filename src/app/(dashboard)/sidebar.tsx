import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
  return (
    <aside className="hidden lg:flex fixed flex-col shrink-0 w-[300px] left-0 h-full">
      <Logo />
      <SidebarRoutes />
    </aside>
  );
};

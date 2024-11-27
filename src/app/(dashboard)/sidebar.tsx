import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
  return (
    <aside className="hideScroll bg-zinc-700 z-50 flex justify-center items-center fixed shrink-0 max-w-screen-lg left-1/2 -translate-x-1/2 py-2 px-6 overflow-x-hidden overflow-y-auto bottom-3 shadow rounded-3xl">
      {/* <Logo /> */}
      <SidebarRoutes />
    </aside>
  );
};

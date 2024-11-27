import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="bg-muted">
      <Sidebar />
      <div className=" flex flex-col">
        <Navbar />
        <main className="bg-white flex-1 overflow-auto p-4 lg:rounded-t-2xl">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

import { UserButton } from "@/features/auth/components/user-button";
import { Logo } from "./logo";

export const Navbar = () => {
  return (
    <nav className="w-full flex items-center p-4 h-[68px]">
        <Logo />
      <div className="ml-auto">
        <UserButton />
      </div>
    </nav>
  );
};

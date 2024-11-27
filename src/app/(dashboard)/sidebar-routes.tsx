"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Crown, Home, MessageCircleQuestion } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

export const SidebarRoutes = () => {
  const pathname = usePathname();
  return (
    <div className="flex gap-y-4 justify-center items-center">
      {/* <div className="px-4">
        <Button
          onClick={() => {}}
          className="w-full rounded-xl border-none hover:bg-white hover:opacity-75 transition"
          variant="outline"
          size="lg"
        >
          <Crown className="mr-2 size-4 fill-yellow-500 text-yellow-500" />
          Upgrade to image AI Pro
        </Button>
      </div> */}
      {/* <div className="px-3">
        <Separator />
      </div> */}
      <ul className="flex gap-y-1 px-3">
        <SidebarItem
          href="/"
          icon={Home}
          label="Home"
          isActive={pathname === "/"}
        />
      </ul>
      {/* <div className="px-3">
        <Separator />
      </div> */}
      <ul className="flex gap-y-1 px-3">
        <SidebarItem
          href={pathname} // stay on the same page but do as on click
          icon={CreditCard}
          label="Billing"
          onClick={() => {}}
        />
        <SidebarItem
          href="mailto:thinkaboutgym@gmail.com" // stay on the same page but do as on click
          icon={MessageCircleQuestion}
          label="Get Help"
        />
      </ul>
    </div>
  );
};

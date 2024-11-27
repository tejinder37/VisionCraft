import React from "react";
import { ChevronsRight } from "lucide-react";
interface ToolSidebarCloseProps {
  onClick: () => void;
}

export const ToolSidebarClose = ({ onClick }: ToolSidebarCloseProps) => {
  return (
    <button
      onClick={onClick}
      className="absolute -left-[1.7rem] h-[70px] bg-white top-1/2 
      transform -translate-y-1/2 flex items-center justify-center rounded
       r-xl px-1 pr-2 border-l border-y group"
    >
      <ChevronsRight className="size-4 text-black group-hover:opacity-75 transition" />
    </button>
  );
};

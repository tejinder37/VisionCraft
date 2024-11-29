import { Icon, type LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";
import React from "react";

interface ShapeToolProps {
  onClick: () => void;
  icon: LucideIcon | IconType;
  iconClassName?: string;
  label: string;
}

export const ShapeTool = ({
  onClick,
  icon: Icon,
  iconClassName,
  label,
}: ShapeToolProps) => {
  return (
    <button onClick={onClick} className="aspect-square border gap-4 flex flex-col justify-center items-center flex-[1_1_100px] rounded-md py-5">
      <h5 className="text-[0.7rem] font-normal">{label}</h5>
      <Icon className={cn("h-12 w-12", iconClassName)} />
    </button>
  );
};

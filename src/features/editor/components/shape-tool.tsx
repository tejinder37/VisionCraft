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
    <button onClick={onClick} className="aspect-square border rounded-md p-5">
      <h1>{label}</h1>
      <Icon className={cn("h-full w-full", iconClassName)} />
    </button>
  );
};

import React from "react";
import { ActiveTool, Editor } from "@/features/editor/types";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ShapeTool } from "@/features/editor/components/shape-tool";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaCircle, FaSquare, FaSquareFull } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";
import { FaDiamond } from "react-icons/fa6";
import {
  PiPentagonBold,
  PiHexagonBold,
  PiStarBold,
  PiParallelogram,
} from "react-icons/pi";
import { BsArrowRight } from "react-icons/bs";
import { TbRectangleFilled } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { RiCloudLine } from "react-icons/ri";
import { TbPlus } from "react-icons/tb";

interface ShapeSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const ShapeSidebar = ({
  activeTool,
  onChangeActiveTool,
  editor,
}: ShapeSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  const shapes = [
    { icon: FaCircle, onClick: () => editor?.addCircle(), label: "Circle" },
    {
      icon: FaSquare,
      onClick: () => editor?.addSoftRectangle(),
      label: "Rounded Rectangle",
    },
    {
      icon: FaSquareFull,
      onClick: () => editor?.addRectangle(),
      label: "Rectangle",
    },
    {
      icon: IoTriangle,
      onClick: () => editor?.addTriangle(),
      label: "Triangle",
    },
    {
      icon: IoTriangle,
      onClick: () => editor?.addInverseTriangle(),
      label: "Inverse Triangle",
      className: "rotate-180",
    },
    { icon: FaDiamond, onClick: () => editor?.addDiamond(), label: "Diamond" },
    {
      icon: PiPentagonBold,
      onClick: () => editor?.addPentagon(),
      label: "Pentagon",
    },
    {
      icon: PiHexagonBold,
      onClick: () => editor?.addHexagon(),
      label: "Hexagon",
    },
    { icon: PiStarBold, onClick: () => editor?.addStar(), label: "Star" },
    { icon: BsArrowRight, onClick: () => editor?.addArrow(), label: "Arrow" },
    {
      icon: PiParallelogram,
      onClick: () => editor?.addParallelogram(),
      label: "Parallelogram",
    },
    {
      icon: TbRectangleFilled,
      onClick: () => editor?.addTrapezoid(),
      label: "Trapezoid",
    },
    { icon: TbPlus, onClick: () => editor?.addCross(), label: "Cross" },
    // { icon: AiOutlineHeart, onClick: () => editor?.addHeart(), label: "Heart" },
    { icon: RiCloudLine, onClick: () => editor?.addCloud(), label: "Cloud" },
  ];

  return (
    <aside
      className={cn(
        "bg-white border-r w-[360px] flex flex-col fixed h-[calc(100dvh_-_57px)] bottom-0 right-[79px] z-40",
        activeTool === "shapes" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Shapes"
        description="Add shapes to your canvas"
      />
      <ScrollArea className="flex-1">
        <div className="flex-wrap gap-4 p-4 flex items-stretch justify-center">
          {shapes.map((shape, index) => (
            <ShapeTool
              key={index}
              onClick={shape.onClick}
              icon={shape.icon}
              iconClassName={shape.className}
              label={shape.label}
            />
          ))}
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

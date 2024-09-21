"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Minimize, ZoomIn, ZoomOut } from "lucide-react";
import { Editor } from "../types";

interface footerProps {
  editor: Editor | undefined;
}
export const Footer = ({ editor }: footerProps) => {
  return (
    <aside className="h-[52px] border-t bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-1 shrink-0 px-4 flex-row-reverse">
      <Hint label="Reset" side="top" sideOffset={10}>
        <Button
          onClick={() => {
            editor?.autoZoom();
          }}
          size="icon"
          variant="ghost"
          className="h-4"
        >
          <Minimize className="size-4" />
        </Button>
      </Hint>
      <Hint label="Zoom in" side="top" sideOffset={10}>
        <Button
          onClick={() => {
            editor?.zoomIn();
          }}
          size="icon"
          variant="ghost"
          className="h-4"
        >
          <ZoomIn className="size-4" />
        </Button>
      </Hint>
      <Hint label="Zoom out" side="top" sideOffset={10}>
        <Button
          onClick={() => {
            editor?.zoomOut();
          }}
          size="icon"
          variant="ghost"
          className="h-4"
        >
          <ZoomOut className="size-4" />
        </Button>
      </Hint>
    </aside>
  );
};

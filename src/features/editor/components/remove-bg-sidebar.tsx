import { ActiveTool, Editor } from "@/features/editor/types";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";
import Image from "next/image";
import { useRemoveBackground } from "@/features/ai/api/use-background-remove";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";

interface RemoveBgSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const RemoveBgSidebar = ({
  activeTool,
  onChangeActiveTool,
  editor,
}: RemoveBgSidebarProps) => {
  const mutation = useRemoveBackground();
  // const { shouldBlock, triggerPaywall } = usePaywall();
  const selectedObject = editor?.selectedObjects[0];
  //@ts-ignore
  const imageSrc = selectedObject?._originalElement?.currentSrc;
  const onClose = () => {
    onChangeActiveTool("select");
  };
  const onClick = () => {
    // TODO: Block the paywall
    // if (shouldBlock) {
    //   // triggerPaywall();
    //   return;
    // }

    if (!imageSrc || !editor) return;
    mutation.mutate(
      { imageUrl: imageSrc },
      {
        onSuccess: ({ data }) => {
          console.log(data);

          // // Remove the old image
          // if (selectedObject) {
          //   editor.canvas.remove(selectedObject);
          // }

          // Add the new image using the addImage method
          editor.addImage(data);
        },
        onError: (error) => {
          console.error("Failed to remove background:", error);
        },
      }
    );
  };

  return (
    <aside
      className={cn(
        "bg-white border-r w-[360px]  flex flex-col fixed  h-[calc(100dvh_-_57px)] bottom-0 right-[79px] z-40",
        activeTool === "remove-bg" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Background Removal"
        description="Remove background of an image using AI"
      />
      {!imageSrc && (
        <div className="flex flex-col gapy-y-4 items-center justify-center flex-1">
          <AlertTriangle className="size-4 text-muted-foreground" />
          <p className="text-muted-foreground text-xs">
            Feature not available for this object
          </p>
        </div>
      )}
      {imageSrc && (
        <ScrollArea>
          <div className="p-4 space-y-4">
            <div
              className={cn(
                "relative aspect-square rounded-md overflow-hidden transition bg-muted",
                mutation.isPending && "opacity-50"
              )}
            >
              <Image src={imageSrc} alt="Image" fill className="object-cover" />
            </div>
            <Button
              className="w-full"
              onClick={onClick}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Processing..." : "Remove background"}
            </Button>
          </div>
        </ScrollArea>
      )}
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

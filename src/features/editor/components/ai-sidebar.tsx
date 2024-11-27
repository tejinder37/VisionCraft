import { ActiveTool, Editor } from "@/features/editor/types";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea as TextArea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useGenerateImage } from "@/features/ai/api/use-generate-image";
import React, { useState } from "react";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";
interface AiSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const AiSidebar = ({
  activeTool,
  onChangeActiveTool,
  editor,
}: AiSidebarProps) => {
  const mutation = useGenerateImage();
  const [value, setValue] = useState("");
  const { triggerPaywall, shouldBlock } = usePaywall();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (shouldBlock) {
      triggerPaywall();
      return;
    }
    mutation.mutate(
      { prompt: value },
      {
        onSuccess: ({ data }) => {
          if (data) {
            editor?.addImage(data); // Add the image URL to the editor
          }
        },
        onError: (error) => {
          console.error("Image generation failed:", error.message);
        },
      }
    );
  };
  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col fixed  h-[calc(100dvh_-_57px)] bottom-0 right-[79px] z-40",
        activeTool === "ai" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title="AI" description="Generate an Image using AI" />
      <ScrollArea>
        <form className="p-4 space-y-6" onSubmit={onSubmit}>
          <TextArea
            placeholder="Something"
            cols={30}
            rows={10}
            minLength={3}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            disabled={mutation.isPending}
            value={value}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            Generate
          </Button>
        </form>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

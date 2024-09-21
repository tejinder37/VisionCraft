import { ActiveTool, Editor } from "@/features/editor/types";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
interface TextSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const TextSidebar = ({
  activeTool,
  onChangeActiveTool,
  editor,
}: TextSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "text" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title="Text" description="add text to your canvas" />
      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Button
            className="w-full"
            onClick={() => {
              editor?.addText("Textbox");
            }}
          >
            Add a textbox
          </Button>
        </div>
        <div className="p-4 space-y-4 border-b">
          <Button
            className="w-full h-16"
            variant="secondary"
            onClick={() => {
              editor?.addText("Textbox", {
                fontSize: 80,
                fontWeight: 700,
              });
            }}
          >
            <span className="text-3xl font-bold">Add a heading</span>
          </Button>
        </div>
        <div className="p-4 space-y-4 border-b">
          <Button
            className="w-full h-16"
            variant="secondary"
            onClick={() => {
              editor?.addText("Textbox", {
                fontSize: 50,
                fontWeight: 500,
              });
            }}
          >
            <span className="text-2xl font-semibold">Add a subheading</span>
          </Button>
        </div>
        <div className="p-4 space-y-4 border-b">
          <Button
            className="w-full h-16"
            variant="secondary"
            onClick={() => {
              editor?.addText("Textbox", {
                fontSize: 32,
              });
            }}
          >
            Paragraph
          </Button>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

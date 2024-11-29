import { ActiveTool, Editor, filters } from "@/features/editor/types";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
interface FilterSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const FilterSidebar = ({
  activeTool,
  onChangeActiveTool,
  editor,
}: FilterSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white border-r w-[360px]  flex flex-col fixed  h-[calc(100dvh_-_57px)] bottom-0 right-[79px] z-40",
        activeTool === "filter" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Filter"
        description="Apply a filter to your image"
      />
      <ScrollArea>
        <div className="p-4 space-y-1 border-b">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant="secondary"
              size="lg"
              className="w-full h-16 text-left justify-start"
              onClick={() => {
                editor?.changeImageFilter(filter);
                console.log("i'm getting called");
              }}
            >
              {filter}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

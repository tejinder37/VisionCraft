import React, { useCallback, useState } from "react";
import Image from "next/image";
import { AlertTriangle, Loader, Crown, Search } from "lucide-react";

import { ActiveTool, Editor } from "@/features/editor/types";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import {
  useGetTemplates,
  Template,
} from "@/features/projects/api/use-get-templates";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useConfirm } from "@/hooks/use-confirm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import debounce from "lodash.debounce";

const ITEMS_PER_PAGE = 20;

const categories = [
  { value: "", label: "All Categories" },
  { value: "wedding cards", label: "Wedding Cards" },
  { value: "birthday cards", label: "Birthday Cards" },
  { value: "business cards", label: "Business Cards" },
  { value: "flyers", label: "Flyers" },
  { value: "posters", label: "Posters" },
];

interface TemplateSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const TemplateSidebar: React.FC<TemplateSidebarProps> = ({
  editor,
  activeTool,
  onChangeActiveTool,
}) => {
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to replace the current project with this template."
  );

  const { data, isLoading, isError, refetch } = useGetTemplates({
    category,
    page: page.toString(),
    perPage: ITEMS_PER_PAGE.toString(),
    search: searchTerm,
  });

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onClick = async (template: Template) => {
    const ok = await confirm();

    if (ok) {
      try {
        editor?.addImage(template.thumbnailUrl);
      } catch (error) {
        console.error("Failed to load template:", error);
        // Handle error (e.g., show a toast notification)
      }
    }
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
      setPage(1);
      refetch();
    }, 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };
  return (
    <aside
      className={cn(
        "bg-white border-r w-[360px]  flex flex-col fixed  h-[calc(100dvh_-_57px)] bottom-0 right-[79px] z-40",
        activeTool === "templates" ? "visible" : "hidden"
      )}
    >
      <ConfirmDialog />
      <ToolSidebarHeader
        title="Templates"
        description="Choose from a variety of templates to get started"
      />
      <div className="p-4 space-y-4">
        <div className="relative">
          <Search
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            type="text"
            placeholder="Search templates..."
            className="pl-8"
            onChange={handleSearchChange}
          />
        </div>

        <Select value={category} onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value || "w"}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {isLoading && (
        <div className="flex items-center justify-center flex-1">
          <Loader className="size-4 text-muted-foreground animate-spin" />
        </div>
      )}
      {isError && (
        <div className="flex flex-col gap-y-4 items-center justify-center flex-1">
          <AlertTriangle className="size-4 text-muted-foreground" />
          <p className="text-muted-foreground text-xs">
            Failed to fetch templates
          </p>
        </div>
      )}
      <ScrollArea className="flex-1">
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {data?.templates.map((template) => (
              <button
              
                onClick={() => onClick(template)}
                key={template.id}
                className="relative w-full h-[100px] group hover:opacity-75 transition bg-muted rounded-sm overflow-hidden border"
              >
                <Image
                  fill
                  src={template.thumbnailUrl}
                  alt={template.name}
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 size-8 items-center flex justify-center bg-black/50 rounded-full">
                  <Crown className="size-4 fill-yellow-500 text-yellow-500" />
                </div>
                <div className="opacity-0 group-hover:opacity-100 absolute left-0 bottom-0 w-full text-[10px] truncate text-white p-1 bg-black/50 text-left">
                  {template.name}
                </div>
              </button>
            ))}
          </div>
          {data && data.total_pages > page && (
            <div className="mt-4 flex justify-center">
              <Button onClick={handleLoadMore}>Load More</Button>
            </div>
          )}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

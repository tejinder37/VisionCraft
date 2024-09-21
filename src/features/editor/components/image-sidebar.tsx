import React, { useState } from "react";
import { ActiveTool, Editor } from "@/features/editor/types";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, Loader, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetImages,
  UnsplashImage,
} from "@/features/images/api/use-get-images";

interface ImageSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const ImageSidebar: React.FC<ImageSidebarProps> = ({
  activeTool,
  onChangeActiveTool,
  editor,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [perPage] = useState(20);
  const [color, setColor] = useState("any");
  const [orientation, setOrientation] = useState("any");

  const { data, isLoading, isError, refetch } = useGetImages({
    searchQuery,
    page,
    perPage,
    color: color !== "any" ? color : undefined,
    orientation: orientation !== "any" ? orientation : undefined,
  });

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    refetch();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editor) {
      const imageUrl = URL.createObjectURL(file);
      editor.addImage(imageUrl);
    }
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "images" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Images"
        description="Search and add images to your canvas"
      />

      <div className="p-4 space-y-4 space-x-3">
        <form onSubmit={handleSearch} className="flex space-x-2">
          <Input
            type="text"
            placeholder="Search images..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow"
          />
          <Button
            type="submit"
            size="default"
            className="bg-blue-500 ring-2 ring-blue-600 ring-offset-2 hover:bg-blue-500  hover:opacity-75"
          >
            <Search className="size-4" />
          </Button>
        </form>

        <div className="flex space-x-2">
          <Select value={color} onValueChange={setColor}>
            <SelectTrigger className="w-1/2">
              <SelectValue placeholder="Color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any color</SelectItem>
              <SelectItem value="black_and_white">Black & White</SelectItem>
              <SelectItem value="black">Black</SelectItem>
              <SelectItem value="white">White</SelectItem>
              <SelectItem value="yellow">Yellow</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
              <SelectItem value="red">Red</SelectItem>
              <SelectItem value="purple">Purple</SelectItem>
              <SelectItem value="magenta">Magenta</SelectItem>
              <SelectItem value="green">Green</SelectItem>
              <SelectItem value="teal">Teal</SelectItem>
              <SelectItem value="blue">Blue</SelectItem>
            </SelectContent>
          </Select>

          <Select value={orientation} onValueChange={setOrientation}>
            <SelectTrigger className="w-1/2">
              <SelectValue placeholder="Orientation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any orientation</SelectItem>
              <SelectItem value="landscape">Landscape</SelectItem>
              <SelectItem value="portrait">Portrait</SelectItem>
              <SelectItem value="squarish">Squarish</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 ring-2 ring-blue-600 ring-offset-2">
            <label
              htmlFor="image-upload"
              className="cursor-pointer w-full inline-block"
            >
              Upload Image
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </Button>
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center flex-1">
          <Loader className="h-4 w-4 text-muted-foreground animate-spin" />
        </div>
      )}

      {isError && (
        <div className="flex items-center justify-center flex-1 flex-col gap-4">
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          <p className="text-muted-foreground text-xs">
            Failed to fetch images
          </p>
        </div>
      )}

      <ScrollArea className="flex-1">
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {data?.images.map((image: UnsplashImage) => (
              <button
                key={image.id}
                className="relative w-full h-[100px] group hover:opacity-75 transition bg-muted rounded-sm overflow-hidden border"
                onClick={() => {
                  editor?.addImage(image.urls.regular);
                }}
              >
                <Image
                  fill
                  src={image.urls.small}
                  alt={image.alt_description || "image"}
                  className="object-cover"
                />
                <Link
                  href={image.links.html}
                  target="_blank"
                  className="opacity-0 group-hover:opacity-100 absolute left-0 bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50 text-left"
                >
                  {image.user.name}
                </Link>
              </button>
            ))}
          </div>
        </div>
      </ScrollArea>

      {data && (
        <div className="p-4 flex justify-between items-center">
          <Button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1 && isLoading}
            className="bg-blue-500 hover:opacity-75 ring-2 ring-blue-600 ring-offset-2"
          >
            Previous
          </Button>
          <span>
            Page {page} of {data.total_pages}
          </span>
          <Button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === data.total_pages}
            className="bg-blue-500 hover:opacity-75 ring-2 ring-blue-600 ring-offset-2"
          >
            Next
          </Button>
        </div>
      )}

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

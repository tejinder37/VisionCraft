"use client";

import React from "react";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import {
  AlertTriangle,
  Copy,
  FileIcon,
  Loader,
  MoreHorizontal,
  Search,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import {
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useDuplicateProject } from "@/features/projects/api/use-duplicate-project";
import { useDeleteProject } from "@/features/projects/api/use-delete-project";
import { useConfirm } from "@/hooks/use-confirm";
export const ProjectsSection = () => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this project."
  );
  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetProjects();
  const duplicateMutation = useDuplicateProject();
  const deleteMutation = useDeleteProject();
  const router = useRouter();

  const onCopy = (id: string) => {
    duplicateMutation.mutate({ id });
  };
  const onDelete = async (id: string) => {
    const ok = await confirm();
    if (ok) {
      deleteMutation.mutate({ id });
    }
  };

  if (status === "pending") {
    <div className="space-y-4 ">
      <h3 className="font-semibold text-lg">Recent Projects</h3>
      <div className="flex flex-col gap-y-4 items-center justify-center h-32">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    </div>;
  }
  if (status === "error") {
    <div className="space-y-4 ">
      <h3 className="font-semibold text-lg">Recent Projects</h3>
      <div className="flex flex-col gap-y-4 items-center justify-center h-32">
        <AlertTriangle className="size-6 text-muted-foreground" />
        <p className="text-muted-foreground text-sm">Failed to load projects</p>
      </div>
    </div>;
  }
  if (!data?.pages.length || !data.pages[0].data.length) {
    return (
      <div className="space-y-4 ">
        <h3 className="font-semibold text-lg">Recent Projects</h3>
        <div className="flex flex-col gap-y-4 items-center justify-center h-32">
          <Search className="size-6 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">No projects found!</p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <ConfirmDialog />
      <h3 className="font-semibold text-lg">Recent Projects</h3>
      <Table>
        <TableBody>
          {data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.map((project) => (
                <TableRow key={project.id}>
                  <TableCell
                    className="font-medium flex items-center gap-x-2 cursor-pointer"
                    onClick={() => router.push(`/editor/${project.id}`)}
                  >
                    <FileIcon className="size-6" />
                    {project.name}
                  </TableCell>
                  <TableCell
                    onClick={() => router.push(`/editor/${project.id}`)}
                    className="hidden md:table-cell cursor-pointer"
                  >
                    {project.width} x {project.height} px
                  </TableCell>
                  <TableCell
                    className="hidden md:table-cell cursor-pointer"
                    onClick={() => router.push(`/editor/${project.id}`)}
                  >
                    {formatDistanceToNow(project.updatedAt, {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell className="flex items-center justify-end">
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" disabled={false}>
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-60">
                        <DropdownMenuItem
                          className="h-10 cursor-pointer"
                          disabled={duplicateMutation.isPending}
                          onClick={() => {
                            onCopy(project.id);
                          }}
                        >
                          <Copy className="size-4 mr-2" />
                          Make a copy
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="h-10 cursor-pointer"
                          disabled={deleteMutation.isPending}
                          onClick={() => {
                            onDelete(project.id);
                          }}
                        >
                          <Trash className="size-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>

      {hasNextPage && (
        <div className="w-full flex items-center justify-center pt-4">
          <Button
            variant="ghost"
            onClick={() => {
              fetchNextPage();
            }}
            disabled={isFetchingNextPage}
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

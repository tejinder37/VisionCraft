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
import Image from "next/image";
import logo from '@/public/logo.svg'
import bg from '@/public/bg.jpg'
import bg1 from '@/public/bg1.webp'
import bg2 from '@/public/bg2.jpg'
export const ProjectsSection = () => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this project."
  );
  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetProjects();
  console.log("data", data);

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
    <>
      <div className="flex justify-center items-start flex-col flex-wrap gap-6">
        <div className="flex-[1_1_0%] w-full">

          <div className="space-y-4">
            <ConfirmDialog />
            <h3 className="font-semibold text-lg">Recent Projects</h3>
            <div className="overflow-x-auto bg-white rounded-xl">

              <Table>
                <TableBody>
                  {data.pages.map((group, i) => (
                    <React.Fragment key={i}>
                      {group.data.map((project) => (
                        <TableRow key={project.id} className="bg-gray-200 border-b-4 border-white">
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

            </div>
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
        </div>
        <div className="flex-[3_1_500px]">
          <div className="flex justify-center items-stretch gap-6 flex-wrap">
            <div className="flex-[1_1_500px]">
              <div className="card overflow-hidden relative z-0 rounded-xl h-full border-t shadow">
                <div className="cardImage max-h-[300px] h-full">
                  <Image src={bg} alt="cardImage webHome page" className="block h-full w-full object-cover" />
                </div>
                <div className="openTemplate bg-white rounded-xl py-2 px-3 absolute bottom-4 right-4 flex justify-center items-center gap-2">
                  <Image src={logo} alt="logo" className="h-4 w-4 object-contain"/>
                  <span className="text-[0.8rem] font-medium">Open</span>
                </div>
              </div>
            </div>
            <div className="flex-[1_1_500px]">
              <div className="card overflow-hidden relative z-0 rounded-xl h-full border-t shadow">
                <div className="cardImage max-h-[300px] h-full">
                  <Image src={bg1} alt="cardImage webHome page" className="block h-full w-full object-cover" />
                </div>
                <div className="openTemplate bg-white rounded-xl py-2 px-3 absolute bottom-4 right-4 flex justify-center items-center gap-2">
                  <Image src={logo} alt="logo" className="h-4 w-4 object-contain"/>
                  <span className="text-[0.8rem] font-medium">Open</span>
                </div>
              </div>
            </div>
            <div className="flex-[1_1_500px]">
              <div className="card overflow-hidden relative z-0 rounded-xl h-full border-t shadow">
                <div className="cardImage max-h-[300px] h-full">
                  <Image src={bg2} alt="cardImage webHome page" className="block h-full w-full object-cover" />
                </div>
                <div className="openTemplate bg-white rounded-xl py-2 px-3 absolute bottom-4 right-4 flex justify-center items-center gap-2">
                  <Image src={logo} alt="logo" className="h-4 w-4 object-contain"/>
                  <span className="text-[0.8rem] font-medium">Open</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

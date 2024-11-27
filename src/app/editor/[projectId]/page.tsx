"use client";
import { Button } from "@/components/ui/button";
import { Editor } from "@/features/editor/components/editor";
import { useGetProject } from "@/features/projects/api/use-get-project";
import { Loader, TriangleAlert } from "lucide-react";
import Link from "next/link";

interface EditorProjectIdPageProps {
  params: {
    projectId: string;
  };
}

const EditorProjectIdPage = ({ params }: EditorProjectIdPageProps) => {
  const { data, isLoading, isError } = useGetProject(params.projectId);

  if (isLoading || !data) {
    return (
      <div className="h-[100dvh] flex items-center justify-center">
        <Loader className="size-10 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="h-full flex flex-col gap-y-5 items-center justify-center">
        <TriangleAlert className="size-6  text-muted-foreground" />
        <p className="text-muted-foreground text-xs">Failed to fetch project</p>
        <Button asChild variant="secondary">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  return <Editor initialData={data} />;
};

export default EditorProjectIdPage;

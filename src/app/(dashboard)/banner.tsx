"use client";

import { Button } from "@/components/ui/button";
import { useCreateProject } from "@/features/projects/api/use-create-project";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export const Banner = () => {
  const mutation = useCreateProject();
  const router = useRouter();
  const onClick = () => {
    console.log("i'm clicked");

    mutation.mutate(
      {
        name: "Untitled Project",
        json: "",
        width: 900,
        height: 1200,
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/editor/${data.id}`);
        },
      }
    );
  };
  return (
    <div className=" text-white aspect-[5/1] min-h-[248px] flex gap-x-6 p-6 items-center rounded-xl bg-gradient-to-r from-[#2e62cb] via-[#0073ff] to-[#3faff5]">
      <div className="rounded-full size-28  items-center justify-center bg-white/50 hidden md:flex">
        <div className="rounded-full size-20 flex items-center justify-center bg-white">
          <Sparkles className="h-20 text-[#0073ff] fill-[#0073ff]" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <h1 className="md:text-3xl text-xl font-semibold">
          Visualize your ideas with Image AI
        </h1>
        <p className="md:text-sm text-xs mb-2">
          Turn inspiration into design into no time.Simply upload an image & let
          AI do the rest.
        </p>
        <Button
          onClick={onClick}
          variant="secondary"
          className="w-[160px]"
          disabled={mutation.isPending}
        >
          Start creating
          <ArrowRight className="size-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

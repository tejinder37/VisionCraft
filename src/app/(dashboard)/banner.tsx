"use client";

import { Button } from "@/components/ui/button";
import { useCreateProject } from "@/features/projects/api/use-create-project";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import bg1 from '@/public/bg1.webp'
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
    <div style={{backgroundImage: `url(${bg1.src})`}} className=" text-white aspect-[5/1] min-h-[248px] flex gap-x-6 p-6 items-center rounded-xl bg-no-repeat bg-center bg-cover overflow-hidden relative z-0 before:h-full before:w-full before:bg-slate-950 before:bg-opacity-50 before:z-[-1] before:absolute before:top-0 before:start-0">
      <div className="rounded-full size-28  items-center justify-center bg-white/50 hidden md:flex">
        <div className="rounded-full size-20 flex items-center justify-center bg-white">
          <Sparkles className="h-20 text-orange-500 fill-orange-500" />
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
          className="w-[160px] hover:bg-gray-200"
          disabled={mutation.isPending}
        >
          Start creating
          <ArrowRight className="size-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

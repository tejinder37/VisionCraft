import Link from "next/link";
import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import logo from '@/public/logo.svg'
const font = Space_Grotesk({
  weight: ["700"],
  subsets: ["latin"],
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-2 hover:opacity-65 transition h-[68px] px-4">
        <div className="size-8 relative">
          <Image src={logo} alt="Image AI" fill />
        </div>
        <h1 className={cn(font.className, "text-xl font-bold")}>
          Vision Craft
        </h1>
      </div>
    </Link>
  );
};

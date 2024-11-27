import Image from "next/image";
import Link from "next/link";
import logo from '@/public/logo.svg'
export const Logo = () => {
  return (
    <Link href="/">
      <div className="size-8 relative shrink-0">
        <Image
          src={logo}
          
          alt="Image Ai"
          fill
          className="shrink-0 hover:opacity-75 transition"
        />
      </div>
    </Link>
  );
};

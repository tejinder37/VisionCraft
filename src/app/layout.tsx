import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Modals } from "@/components/modals";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Canva-Like Design Studio: Advanced Collaborative Web App with JSON & Export Features",
  description:
    "A powerful design studio built with Next.js, TypeScript, and Fabric.js, offering advanced drawing, editing, and real-time collaboration. Features include social logins, JSON file handling, and export options in PNG, JPG, and SVG formats.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth(); // only available in sever components
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <Providers>
            <Toaster />
            <Modals />
            {children}
          </Providers>
        </body>
      </html>
    </SessionProvider>
  );
}

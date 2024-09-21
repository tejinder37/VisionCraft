import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="bg-[url(/bg1.webp)]  bg-top bg-cover h-full w-full flex flex-col">
      <div className=" z-[4] h-full w-full flex flex-col items-center justify-center">
        <div className="md:h-auto md:w-[420px]">{children}</div>
      </div>
      <div className="fixed inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.8),rgba(0,0,.0,.4),rgba(0,0,0,.8))]" />
    </div>
  );
};

export default AuthLayout;
"use client";
import IconSideNav from "@/app/_components/NavbarAdmin";
import React from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import ErrorProtectRole from "@/app/_components/ErrorProtectRole";
import { Spinner } from "@nextui-org/react";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  if (status === "loading")
    return <Spinner className="flex items-center justify-center h-screen" />;
  if (pathname.startsWith("/admin") && session?.user?.role !== "admin")
    return <ErrorProtectRole title="Admin" />;

  return <IconSideNav>{children}</IconSideNav>;
}

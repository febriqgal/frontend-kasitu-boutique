"use client";
import ErrorProtectRole from "@/app/_components/ErrorProtectRole";
import NavbarUser from "@/app/_components/NavbarUser";
import { Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  if (status === "loading")
    return <Spinner className="flex items-center justify-center h-screen" />;

  if (pathname.startsWith("/user") && session?.user?.role !== "user")
    return <ErrorProtectRole title="user" />;

  return <NavbarUser>{children}</NavbarUser>;
}

import { Button } from "@nextui-org/react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { AppConfig } from "./_constants/AppConfig";

export const metadata: Metadata = {
  title: `404 - ${AppConfig.title}`,
  description: "Generated by create next app",
};

export default function NotFound() {
  return (
    <div className="grid h-screen px-4 bg-white place-content-center">
      <div className="text-center">
        <h1 className="font-black text-gray-200 text-9xl">404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500">We cant find that page.</p>

        <Button as={Link} href={"/"} color="primary" className="mt-8">
          Go Back Home
        </Button>
      </div>
    </div>
  );
}

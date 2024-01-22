/* eslint-disable @next/next/no-img-element */
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function ErrorProtectRole({ title }: { title: string }) {
  return (
    <div className="flex flex-col h-screen bg-white">
      <img
        src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80"
        alt=""
        className="object-cover w-full h-64"
      />

      <div className="flex items-center justify-center flex-1">
        <div className="max-w-xl px-4 py-8 mx-auto text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Hayooo mau ngapain?
          </h1>

          <p className="mt-4 text-gray-500">
            Anda tidak diizinkan kehalaman {title}
          </p>

          <Button as={Link} href="/" color="primary" className="mt-8">
            Go Back Home
          </Button>
        </div>
      </div>
    </div>
  );
}

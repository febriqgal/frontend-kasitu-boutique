import Image from "next/image";
import React from "react";
import HeaderImage from "@/public/header.png";
export default function Header() {
  return (
    <section className="bg-primary h-[300px] rounded-xl overflow-clip border-2">
      <Image
        src={HeaderImage}
        alt="Header Image"
        className="object-cover w-full h-full"
      />
    </section>
  );
}

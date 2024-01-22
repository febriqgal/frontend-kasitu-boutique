import Logo from "@/public/logo.png";
import Image from "next/image";
import { Facebook, Instagram } from "react-huge-icons/bulk";

export default function FooterMain() {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-5xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <Image height={70} src={Logo} alt="Logo" />
        </div>

        <h1 className="text-center mt-5">© 2023 - Tika Amelia</h1>
        <ul className="flex items-center justify-center gap-6 mt-12 md:gap-8">
          <Facebook className="size-6" />
          <Instagram className="size-6" />
        </ul>
      </div>
    </footer>
  );
}

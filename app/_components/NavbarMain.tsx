"use client";
import Logo from "@/public/logo.png";
import { Badge, Button, Skeleton } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { CartHasDash } from "react-huge-icons/bulk";
import { AppConfig } from "../_constants/AppConfig";
import { useGetByUserIdCartApiQuery } from "../_redux/feature/cartsSlice";
import DropdownProfile from "./DropdownProfile";
import ModalSearch from "./ModalSearch";
export default function NavbarMain() {
  const { data: session, status } = useSession();
  const { data } = useGetByUserIdCartApiQuery(`${session?.user?.id}`);
  console.log(data);

  return (
    <div className="fixed z-10 w-full bg-white border-b  backdrop-blur">
      <div className="container w-full mx-auto">
        <div className="flex items-center gap-4 py-4">
          <Link href={"/"} title={`Beranda ${AppConfig.title}`}>
            <Image height={70} src={Logo} alt="Logo" />
          </Link>
          <ModalSearch />
          <Link href={"/cart"}>
            <Badge color="primary" content={data?.data?.length} size="sm">
              <CartHasDash className="size-5 text-primary" />
            </Badge>
          </Link>
          {status === "loading" ? (
            <Skeleton className="w-[100px] h-4 rounded-xl" />
          ) : (
            <>
              {session ? (
                <div>
                  <DropdownProfile />
                </div>
              ) : (
                <Button as={Link} href={"/login"} size="sm" color="primary">
                  Login
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

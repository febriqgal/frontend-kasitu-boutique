"use client";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
export default function DropdownProfile() {
  const { data: session } = useSession();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar size="sm" color="primary" />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem isReadOnly>{session?.user?.name}</DropdownItem>

        <DropdownItem
          as={Link}
          href={session?.user?.role === "admin" ? "/admin" : "/user"}
        >
          Dashboard
        </DropdownItem>

        <DropdownItem
          onPress={async () => await signOut()}
          key="delete"
          className="text-danger"
          color="danger"
        >
          Keluar
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

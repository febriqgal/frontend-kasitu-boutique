"use client";
import { formatRupiah } from "@/app/_constants/AppConfig";
import { useGetUserApiQuery } from "@/app/_redux/feature/usersSlice";
import { User } from "@/app/_types/user";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";

export default function KelolaUserPage() {
  const { data: dataUser, isLoading } = useGetUserApiQuery({});
  console.log(dataUser);

  return (
    <div className="w-full p-10">
      <Table
        color="primary"
        className="w-full "
        fullWidth
        aria-label="Example static collection table"
      >
        <TableHeader>
          <TableColumn>No</TableColumn>
          <TableColumn>Nama</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Alamat</TableColumn>
          <TableColumn>Nomor Telepon</TableColumn>
        </TableHeader>
        <TableBody>
          {dataUser?.data.map((e: User, i: number) => {
            return (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{e.name}</TableCell>
                <TableCell>{e.email}</TableCell>
                <TableCell>{e.address}</TableCell>
                <TableCell>{e.phone}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

/* eslint-disable @next/next/no-img-element */
"use client";
import ModalBayar from "@/app/_components/ModalBayar";
import ModalConfirmSuccess from "@/app/_components/ModalConfirmSuccess";
import { AppConfig, formatRupiah } from "@/app/_constants/AppConfig";
import { useGetByidOrderApiQuery } from "@/app/_redux/feature/ordersSlice";
import { Order } from "@/app/_types/order";
import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function HistoryPage() {
  const { data: session } = useSession();
  const { data: dataOrder, isLoading } = useGetByidOrderApiQuery(
    `${session?.user?.id}`,
    {}
  );

  if (isLoading)
    return <Spinner className="flex items-center justify-start min-h-screen" />;

  return (
    <div className="min-h-screen">
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>No.</TableColumn>
          <TableColumn>Produk</TableColumn>
          <TableColumn>Gambar</TableColumn>
          <TableColumn>qty</TableColumn>
          <TableColumn>Catatan</TableColumn>
          <TableColumn>Alamat</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Total</TableColumn>
          <TableColumn className="text-center">Bukti Pembayaran</TableColumn>
          <TableColumn>
            <h1></h1>
          </TableColumn>
        </TableHeader>
        <TableBody>
          {dataOrder?.data.map((e: Order, i: number) => {
            return (
              <TableRow key={e.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{e.title}</TableCell>
                <TableCell>
                  <img
                    className="h-10 aspect-video rounded-xl"
                    src={`${AppConfig.imgURL}${e.image}`}
                    alt={e.title}
                  />
                </TableCell>
                <TableCell>{e.quantity as number}</TableCell>
                <TableCell>{e.note}</TableCell>
                <TableCell>{e.address}</TableCell>
                <TableCell>{e.status}</TableCell>
                <TableCell>{formatRupiah(e.total as number)}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    target="_blank"
                    isDisabled={!e.payment}
                    fullWidth
                    as={Link}
                    href={`${AppConfig.imgURL}${e.payment}`}
                  >
                    Link
                  </Button>
                </TableCell>
                <TableCell>
                  {e.status === "delivered" ? (
                    <ModalConfirmSuccess dataOrder={e} />
                  ) : (
                    <ModalBayar dataOrder={e} />
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

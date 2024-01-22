"use client";

import ModalAddProduct from "@/app/_components/ModalAddProduct";
import ModalDeleteProduct from "@/app/_components/ModalDeleteProduct";
import ModalEditProduct from "@/app/_components/ModalEditProduct";
import { formatRupiah } from "@/app/_constants/AppConfig";
import { useGetProductApiQuery } from "@/app/_redux/feature/productsSlice";
import { Product } from "@/app/_types/products";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function KelolaProdukPage() {
  const { data: dataProduct } = useGetProductApiQuery({});

  return (
    <div className="w-full p-10">
      <ModalAddProduct />
      <Table
        color="primary"
        className="w-full "
        fullWidth
        aria-label="Example static collection table"
      >
        <TableHeader>
          <TableColumn>Nama Barang</TableColumn>
          <TableColumn>Deskripsi Barang</TableColumn>
          <TableColumn>Harga</TableColumn>
          <TableColumn>Stok</TableColumn>
          <TableColumn>Diskon</TableColumn>
          <TableColumn>Total</TableColumn>
          <TableColumn>Aksi</TableColumn>
        </TableHeader>
        <TableBody>
          {dataProduct?.data.map((e: Product, i: number) => {
            return (
              <TableRow key={i}>
                <TableCell>{e.title}</TableCell>
                <TableCell>{e.desc}</TableCell>
                <TableCell>{formatRupiah(Number(e.price))}</TableCell>
                <TableCell>{e.stock}</TableCell>
                <TableCell>{e.discount}%</TableCell>
                <TableCell>
                  {formatRupiah(
                    (e.price as unknown as number) -
                      ((e.price as unknown as number) *
                        (e.discount as unknown as number)) /
                        100
                  )}
                </TableCell>
                <TableCell className="flex gap-1">
                  <Button
                    size="sm"
                    color="primary"
                    as={Link}
                    href={`/p/${e.id}`}
                  >
                    Lihat
                  </Button>
                  <ModalDeleteProduct dataProduct={e} />
                  <ModalEditProduct dataProduct={e} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

/* eslint-disable @next/next/no-img-element */
"use client";
import ModalLaporanBulanan from "@/app/_components/ModalReportMonth";
import ModalLaporanTahunan from "@/app/_components/ModalReportYear";
import { AppConfig, formatRupiah } from "@/app/_constants/AppConfig";
import { useGetOrderApiQuery } from "@/app/_redux/feature/ordersSlice";
import { Order } from "@/app/_types/order";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import ModalReportDay from "@/app/_components/ModalReportDay";
export default function KelolaPenejualanPage() {
  const { data: dataOrder } = useGetOrderApiQuery({});

  return (
    <div className="w-full p-10 space-y-2">
      <div className="flex gap-2">
        <ModalReportDay />
        <ModalLaporanTahunan />
        <ModalLaporanBulanan />
      </div>
      <Table
        color="primary"
        className="w-full"
        fullWidth
        aria-label="Example static collection table"
      >
        <TableHeader>
          <TableColumn>No</TableColumn>
          <TableColumn>Nama</TableColumn>
          <TableColumn>Nama Produk</TableColumn>
          <TableColumn>Gambar</TableColumn>
          <TableColumn>HP</TableColumn>
          <TableColumn>Alamat</TableColumn>
          <TableColumn>qty</TableColumn>
          <TableColumn>Total</TableColumn>
          <TableColumn>Bukti Pembayaran</TableColumn>
          <TableColumn>Catatan</TableColumn>
          <TableColumn>Tanggal</TableColumn>
          <TableColumn>Status</TableColumn>
        </TableHeader>
        <TableBody>
          {dataOrder?.data.map((e: Order, i: number) => {
            return (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{e.name}</TableCell>
                <TableCell>{e.title}</TableCell>
                <TableCell>
                  <img
                    src={`${AppConfig.imgURL}/${e.image}`}
                    alt="#"
                    className="size-10"
                  />
                </TableCell>
                <TableCell>{e.phone}</TableCell>
                <TableCell>{e.address}</TableCell>
                <TableCell>{e.quantity as number}</TableCell>
                <TableCell>{formatRupiah(e.total as number)}</TableCell>

                <TableCell>
                  <Button
                    as={Link}
                    target="_blank"
                    href={`${AppConfig.imgURL}${e.payment}`}
                    size="sm"
                    fullWidth
                    color="primary"
                    isDisabled={!e.payment}
                  >
                    Link
                  </Button>
                </TableCell>
                <TableCell>{e.note}</TableCell>
                <TableCell className="text-nowrap">
                  {dayjs(e.created_at).format("DD MMMM YYYY - HH:mm")}
                </TableCell>
                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        size="sm"
                        fullWidth
                        color={"primary"}
                        variant={"flat"}
                      >
                        {e.status}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem
                        onPress={async () => {
                          await axios.patch(
                            `${AppConfig.apiURL}/order/${e.id}`,
                            {
                              status: "pending",
                            }
                          );
                          toast.success("Berhasil mengubah status");
                        }}
                        key="new"
                      >
                        Pending
                      </DropdownItem>
                      <DropdownItem
                        onPress={async () => {
                          await axios.patch(
                            `${AppConfig.apiURL}/order/${e.id}`,
                            {
                              status: "delivered",
                            }
                          );
                          toast.success("Berhasil mengubah status");
                        }}
                        key="new"
                      >
                        Delivered
                      </DropdownItem>
                      <DropdownItem
                        onPress={async () => {
                          await axios.patch(
                            `${AppConfig.apiURL}/order/${e.id}`,
                            {
                              status: "cancelled",
                            }
                          );
                          toast.success("Berhasil mengubah status");
                        }}
                        key="new"
                      >
                        Cancelled
                      </DropdownItem>
                      <DropdownItem
                        onPress={async () => {
                          await axios.patch(
                            `${AppConfig.apiURL}/order/${e.id}`,
                            {
                              status: "success",
                            }
                          );
                          toast.success("Berhasil mengubah status");
                        }}
                        key="new"
                      >
                        Success
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

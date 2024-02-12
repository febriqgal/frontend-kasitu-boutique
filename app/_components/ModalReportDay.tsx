"use client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import dayjs from "dayjs";
import { useState } from "react";
import { useGetByStatusOrderApiQuery } from "../_redux/feature/ordersSlice";
import { Order } from "../_types/order";
import ReportDay from "./ReportDay";
export default function ModalReportDay() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: dataOrder } = useGetByStatusOrderApiQuery("success");
  const [data, setData] = useState<Order[]>(dataOrder?.data);
  const [day, setDay] = useState<string>("");
  const filterByName = (event: any) => {
    const value = event.target.value;
    console.log(value);

    setDay(value);
    const filteredData = dataOrder?.data.filter((item: Order) => {
      return dayjs(item.created_at).format("YYYY-MM-DD").includes(value);
    });
    setData(filteredData);
  };
  console.log(dataOrder?.data);

  const objects = dataOrder?.data;
  const schema = [
    {
      column: "No.",
      background: "red",
      type: Number,
      value: (e: Order) => objects.indexOf(e) + 1,
    },
    {
      column: "Nama",
      type: String,
      value: (e: Order) => e.name,
    },
    {
      column: "Produk",
      type: String,
      value: (e: Order) => e.title,
    },

    {
      column: "qty",
      type: Number,
      value: (e: Order) => e.quantity,
    },
    {
      column: "Alamat",
      type: String,

      value: (e: Order) => e.address,
    },
    {
      column: "total",
      type: Number,
      value: (e: Order) => e.total,
    },
  ];
  return (
    <>
      <Button color="primary" size="sm" onPress={onOpen}>
        Laporan Harian
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Laporan Harian
              </ModalHeader>
              <ModalBody>
                <Input
                  isClearable
                  onChange={filterByName}
                  type="date"
                  placeholder="Masukkan Tahun"
                  color="primary"
                  required
                />
              </ModalBody>
              <ModalFooter>
                <PDFDownloadLink
                  document={<ReportDay data={data} month={day} />}
                  fileName={`${Date.now()}.pdf`}
                >
                  {({ blob, url, loading, error }) => (
                    <Button
                      size="sm"
                      disabled={loading}
                      color="primary"
                    >{`Cetak`}</Button>
                  )}
                </PDFDownloadLink>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

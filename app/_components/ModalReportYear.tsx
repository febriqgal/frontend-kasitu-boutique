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
import { useState } from "react";
import { useGetByStatusOrderApiQuery } from "../_redux/feature/ordersSlice";
import { Order } from "../_types/order";
import ReportYear from "./ReportYear";
export default function ModalReportYear() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: dataOrder } = useGetByStatusOrderApiQuery("success");
  const [data, setData] = useState<Order[]>(dataOrder?.data);
  const [year, setYear] = useState<string>("");
  const filterByName = (event: any) => {
    const value = event.target.value;
    setYear(value);
    const filteredData = dataOrder?.data.filter((item: Order) => {
      return new Date(item.created_at).getFullYear().toString().includes(value);
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
        Laporan Tahunan
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Laporan Tahunan
              </ModalHeader>
              <ModalBody>
                <Input
                  isClearable
                  errorMessage="contoh: 2022"
                  onChange={filterByName}
                  type="number"
                  placeholder="Masukkan Tahun"
                  min="2020"
                  max="2100"
                  minLength={4}
                  maxLength={4}
                  color="primary"
                  required
                />
              </ModalBody>
              <ModalFooter>
                <PDFDownloadLink
                  document={<ReportYear data={data} month={year} />}
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

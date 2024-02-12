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
import ReportMonth from "./ReportMonth";

export default function ModalReportMonth() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: dataOrder } = useGetByStatusOrderApiQuery("success");
  const [data, setData] = useState<Order[]>(dataOrder?.data);
  const [month, setMonth] = useState<string>("");
  const filterByName = (event: any) => {
    const value = event.target.value;
    setMonth(value);
    const filteredData = dataOrder?.data.filter((item: Order) => {
      return dayjs(item.created_at).format("YYYY-MM").includes(value);
    });
    setData(filteredData);
  };

  return (
    <>
      <Button color="primary" size="sm" onPress={onOpen}>
        Laporan Bulanan
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Laporan Bulanan
              </ModalHeader>
              <ModalBody>
                <Input
                  isClearable
                  onChange={filterByName}
                  type="month"
                  min="2020"
                  max="2100"
                  minLength={4}
                  maxLength={4}
                  color="primary"
                />
              </ModalBody>
              <ModalFooter>
                <PDFDownloadLink
                  document={<ReportMonth data={data} month={month} />}
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

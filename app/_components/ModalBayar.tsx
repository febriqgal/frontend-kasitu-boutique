import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Order } from "../_types/order";
import { AppConfig, formatRupiah } from "../_constants/AppConfig";

export default function ModalBayar({
  dataOrder,
}: Readonly<{ dataOrder: Order }>) {
  interface IFormInput {
    payment: string;
  }
  const [file, setFile] = useState<File>();
  const { handleSubmit } = useForm<IFormInput>();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const image = new FormData();
    image.set("file", file!);
    await fetch("/api/upload", {
      method: "POST",
      body: image,
    });

    await axios
      .patch(`${AppConfig.apiURL}/order/${dataOrder.id}`, {
        payment: file?.name,
      })
      .then(() => {
        toast.success(
          "Berhasil mengirimkan bukti pembayaran, silahkan tunggu pembayaran anda sedang diproses"
        );
      });
    onClose();
  };
  return (
    <>
      <Button
        isDisabled={dataOrder.status !== "pending" ? true : false}
        color="primary"
        size="sm"
        onPress={onOpen}
      >
        Bayar
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">
                Pembayaran
              </ModalHeader>
              <ModalBody>
                <h1>
                  Silahkan melakukan pembayaran senilai
                  <span className="font-bold">
                    {` ${formatRupiah(dataOrder.total as number)}`}
                  </span>{" "}
                  <br />
                  ke rekening berikut:
                </h1>
                <p>
                  <b>Bank BNI</b> : 1234567890
                </p>
                <p>
                  <b>Bank BRI</b> : 1234567890
                </p>
                <p>
                  <h1>Upload Bukti Pembayaran:</h1>
                  <input
                    required
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0])}
                  />
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Batal
                </Button>
                <Button type="submit" color="primary">
                  Bayar
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

import { Input, Textarea } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { usePostProductMutation } from "../_redux/feature/productsSlice";
export interface Root {
  id: string;
  user_id: string;
  title: string;
  desc: string;
  price: string;
  image: string;
  stock: string;
  discount: string;

  total: string;
  created_at: string;
  updated_at: string;
  user: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  role: string;
  created_at: string;
  updated_at: string;
}
export default function ModalAddProduct() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [loading, setLoading] = React.useState(false);
  const { data: session } = useSession();
  const { register, handleSubmit } = useForm<Root>();
  const [newDataProduct] = usePostProductMutation();
  const [file, setFile] = useState<File>();

  const onSubmit: SubmitHandler<Root> = async (data) => {
    const dataa = new FormData();
    dataa.set("file", file!);
    const result = await fetch("/api/upload", {
      method: "POST",
      body: dataa,
    });
    setLoading(true);
    await newDataProduct({
      user_id: session?.user?.id,
      title: data.title,
      desc: data.desc,
      price: data.price,
      image: file?.name,
      stock: data.stock,
      discount: data.discount,
    }).then((res: any) => {
      setLoading(false);
      toast.success("Berhasil menambahkan produk baru");
    });
    onClose();
  };
  return (
    <>
      <Button className="mb-4" color="primary" onPress={onOpen}>
        Tambah Produk
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">
                Tambahkan Produk
              </ModalHeader>
              <ModalBody>
                <Input
                  color="primary"
                  variant="bordered"
                  label="Nama Produk"
                  size="sm"
                  {...register("title", { required: true })}
                />
                <Textarea
                  color="primary"
                  variant="bordered"
                  size="sm"
                  label="Deskripsi Produk"
                  {...register("desc", { required: true })}
                />
                <Input
                  color="primary"
                  variant="bordered"
                  size="sm"
                  type="number"
                  label="Harga"
                  {...register("price", { required: true })}
                />
                <Input
                  color="primary"
                  variant="bordered"
                  size="sm"
                  type="number"
                  label="Jumlah Stok Barang"
                  {...register("stock", { required: true })}
                />
                <Input
                  color="primary"
                  variant="bordered"
                  size="sm"
                  type="number"
                  label="Discount"
                  {...register("discount", { required: true })}
                />
                <label>
                  Gambar{" "}
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0])}
                  />
                </label>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" isLoading={loading} type="submit">
                  Kirim
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

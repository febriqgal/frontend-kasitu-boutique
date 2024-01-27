/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { SearchShort } from "react-huge-icons/bulk";
import { useGetSearchProductApiQuery } from "../_redux/feature/productsSlice";
import { Product } from "../_types/products";
import { AppConfig } from "../_constants/AppConfig";
import axios from "axios";
import Link from "next/link";
export default function ModalSearch() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [value, setValue] = useState("");
  const [data, setData] = useState<Product[]>([]);
  const { data: dataSearchProduct } = useGetSearchProductApiQuery(value);
  console.log(dataSearchProduct?.data);

  console.log(value);

  const handleSearch = async (e: any) => {
    if (e.target.value.length > 3) {
      setValue(e.target.value);
    }
  };
  useEffect(() => {
    handleSearch({ target: { value: value } });
  }, [handleSearch]);
  return (
    <>
      <Input
        isReadOnly
        onClick={onOpen}
        startContent={<SearchShort className="text-primary" />}
        placeholder="Pencarian"
        variant="faded"
        size="sm"
        color="primary"
      />
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        className="w-full h-[500px] overflow-auto"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Pencarian
              </ModalHeader>
              <ModalBody>
                <Input
                  placeholder="apa yang anda cari?"
                  onChange={handleSearch}
                />
                {dataSearchProduct?.data === null ? (
                  <p className="flex items-center justify-center h-full text-center">
                    Tidak ada data
                  </p>
                ) : (
                  <div>
                    {dataSearchProduct?.data?.map((item: Product) => (
                      <Link
                        href={`/p/${item.id}`}
                        className="flex gap-2 bg-primary-200 p-2 rounded-xl"
                        key={item.id}
                      >
                        <img
                          className="h-6 aspect-video"
                          src={`${AppConfig.imgURL}${item.image}`}
                          alt="#"
                        />
                        <h1>{item.title}</h1>
                      </Link>
                    ))}
                  </div>
                )}
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

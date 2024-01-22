/* eslint-disable @next/next/no-img-element */
"use client";
import { AppConfig, formatRupiah } from "@/app/_constants/AppConfig";
import { usePostCartMutation } from "@/app/_redux/feature/cartsSlice";
import { useGetByidProductApiQuery } from "@/app/_redux/feature/productsSlice";
import { Button, Input, Skeleton, Spinner, Textarea } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { SyntheticEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import StickyBox from "react-sticky-box";

export default function ProductPage({
  params,
}: {
  params: { idProduct: string };
}) {
  const { data: session } = useSession();
  const [note, setNote] = useState("");
  const [newCart] = usePostCartMutation();
  const [price, setPrice] = useState(0);
  const [count, setCounter] = useState(1);
  const { data: dataProduct, isLoading } = useGetByidProductApiQuery(
    `${params.idProduct}`
  );

  useEffect(() => {
    setPrice(
      dataProduct?.data.price -
        (dataProduct?.data.price * dataProduct?.data.discount) / 100
    );
  }, [dataProduct?.data.price, dataProduct?.data.discount]);

  const handleCart = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!session) {
      toast.error("Silahkan login terlebih dahulu");
      return;
    }
    await newCart({
      user_id: `${session?.user?.id}`,
      note: note,
      product_id: `${dataProduct?.data.id}`,
      quantity: Number(count),
      total: Number(price),
    }).then(() => {});
    toast.success("Berhasil ditambahkan ke keranjang");
  };

  if (isLoading)
    return (
      <div className="flex items-start justify-center min-h-screen">
        <Spinner />
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen rounded-b-full -mt-28 ">
      <div className="w-full p-20 bg-white rounded-3xl">
        <div className="flex flex-row gap-5 ">
          <div className="grid w-full grid-cols-2 gap-5">
            <div className="flex items-center justify-center w-full h-full bg-primary-900 rounded-xl overflow-clip">
              <img
                className="object-fill"
                src={`${AppConfig.imgURL}/${dataProduct?.data.image}`}
                alt="#"
              />
            </div>
            <div className="flex items-center">
              <div className="">
                <h1 className="text-3xl font-extrabold tracking-tight">
                  {dataProduct?.data.title}
                </h1>
                <h1 className="">{`Tersisa ${dataProduct?.data.stock}`}</h1>
                <div className="mt-3">
                  <div className="text-3xl font-bold">
                    {formatRupiah(
                      dataProduct?.data.price -
                        (dataProduct?.data.price * dataProduct?.data.discount) /
                          100
                    )}
                  </div>
                </div>
                <div className="mt-3">
                  <div>
                    <h1>{dataProduct?.data.desc}</h1>
                  </div>
                </div>
                <div className="mt-6"></div>
              </div>
            </div>
          </div>

          <StickyBox
            offsetTop={120}
            offsetBottom={20}
            className="flex gap-5 bg-white h-fit w-[300px] shadow-xl p-5 items-center flex-col   border rounded-xl"
          >
            <h1>Atur jumlah pembelian</h1>
            <Input
              fullWidth
              variant="bordered"
              color="primary"
              startContent={
                <Button
                  onPress={() => {
                    count <= 1 ? null : setCounter(count - 1);
                    count <= 1
                      ? null
                      : setPrice(
                          Number(price) -
                            Number(
                              dataProduct?.data.price -
                                (dataProduct?.data.price *
                                  dataProduct?.data.discount) /
                                  100
                            )
                        );
                  }}
                  color="primary"
                  variant="light"
                  size="sm"
                >
                  -
                </Button>
              }
              endContent={
                <Button
                  onPress={async () => {
                    if (count >= dataProduct?.data.stock) {
                      return toast.error(
                        "Stok hanya sisa " + dataProduct?.data.stock
                      );
                    }
                    setCounter(count + 1);
                    setPrice(
                      Number(price) +
                        Number(
                          dataProduct?.data.price -
                            (dataProduct?.data.price *
                              dataProduct?.data.discount) /
                              100
                        )
                    );
                  }}
                  color="primary"
                  size="sm"
                  variant="light"
                >
                  +
                </Button>
              }
              style={{ textAlign: "center" }}
              value={String(count)}
            />
            <div className="flex justify-between w-full">
              <h1>Subtotal:</h1>
              {isLoading ? (
                <Skeleton className="w-20 h-5 rounded-xl" />
              ) : (
                <h1>{formatRupiah(price)}</h1>
              )}
            </div>
            <form onSubmit={handleCart} className="flex flex-col gap-3">
              <Textarea
                name="note"
                type="text"
                title="exp: warna, ukuran, dll yang diinginkan"
                size="sm"
                label="Catatan"
                placeholder="exp: warna, ukuran, dll. yang diinginkan"
                fullWidth
                color="primary"
                isRequired
                onChange={(e) => {
                  setNote(e.target.value);
                }}
              />
              <Button type="submit" size="sm" fullWidth color="primary">
                Tambah ke keranjang
              </Button>
            </form>
          </StickyBox>
        </div>
      </div>
    </div>
  );
}

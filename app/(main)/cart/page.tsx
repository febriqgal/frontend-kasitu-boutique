/* eslint-disable @next/next/no-img-element */
"use client";

import { AppConfig, formatRupiah } from "@/app/_constants/AppConfig";
import {
  useDeleteCartMutation,
  useGetByUserIdCartApiQuery,
  useGetByidCartApiQuery,
} from "@/app/_redux/feature/cartsSlice";
import { useGetUserByIdApiQuery } from "@/app/_redux/feature/usersSlice";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Select,
  SelectItem,
  cn,
} from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { SyntheticEvent, useState } from "react";
import toast from "react-hot-toast";
import StickyBox from "react-sticky-box";
import { Carts } from "../../_types/cart";
import NoDataImage from "@/app/_components/NoData";

export default function CartPage() {
  const dataOngkir = [
    {
      tipe: "Luar Kota",
      value: 30000,
    },
    {
      tipe: "Dalam Kota",
      value: 20000,
    },
    {
      tipe: "Luar Pulau",
      value: 60000,
    },
  ];

  const [ongkir, setOngkir]: any = React.useState(0);
  const [disable, setDisable] = useState(false);
  const [groupSelected, setGroupSelected]: any = React.useState<Carts[]>([]);
  const { data: session } = useSession();
  const { data: dataCart } = useGetByUserIdCartApiQuery(session?.user.id);
  const { data: dataUsers } = useGetUserByIdApiQuery(session?.user.email);
  const [deleteCarts] = useDeleteCartMutation();
  const { data: dataCartSelected } = useGetByidCartApiQuery(
    groupSelected[0] ?? ""
  );
  // console.log(dataProduct);
  // console.log(dataCartSelected?.data);
  // console.log(groupSelected[0]);
  // console.log(dataUsers?.data?.address);
  const handleNewOrders = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (groupSelected.length === 0) {
      toast.error("Pilih produk terlebih dahulu");
    } else {
      setDisable(true);
      await axios
        .post(`${AppConfig.apiURL}/order`, {
          user_id: session?.user.id,
          name: session?.user.name,
          address: dataUsers?.data?.address,
          phone: dataUsers?.data?.phone,
          title: dataCartSelected?.data?.product?.title,
          image: dataCartSelected?.data?.product?.image,
          quantity: dataCartSelected?.data.quantity,
          note: dataCartSelected?.data.note,
          status: "pending",
          total:
            Number(dataCartSelected?.data?.total ?? 0) +
            Number(ongkir.anchorKey ?? 0),
        })
        .then((res) => {});

      toast.success("Berhasil checkout, silahkan lakukan pembayaran");
      setDisable(false);
      setGroupSelected([]);
      deleteCarts(groupSelected[0]);
    }
  };
  if (dataCart?.data.length === 0)
    return <NoDataImage title="Keranjang masih kosong 😒" />;
  return (
    <div className="min-h-screen space-y-4">
      <h1 className="text-2xl font-bold">Keranjang 🛒</h1>
      <form onSubmit={handleNewOrders} className="w-full space-y-4">
        {disable === false ? (
          <h1>Silahkan Pilih salah satu yang mau di checkout</h1>
        ) : (
          <Button
            color="primary"
            onPress={() => {
              setGroupSelected([]);
              if (disable === true) {
                setDisable(false);
              }
            }}
          >
            Batalkan
          </Button>
        )}
        <div className="flex justify-between">
          <CheckboxGroup
            isRequired
            value={groupSelected}
            onChange={setGroupSelected}
            classNames={{
              base: "w-full",
            }}
            className="w-full"
          >
            {dataCart?.data?.map((e: Carts) => {
              return (
                <Checkbox
                  onChange={() => {
                    setDisable(!disable);
                  }}
                  isDisabled={disable}
                  key={e.id}
                  value={e.id}
                  className="w-full"
                  classNames={{
                    base: cn(
                      "inline-flex  w-full bg-content1 m-0",
                      "hover:bg-content2 items-center justify-start",
                      "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                      "data-[selected=true]:border-primary"
                    ),
                  }}
                >
                  <div className="flex justify-between overflow-clip w-[500px] gap-4 items-center">
                    <div className="flex items-center justify-center gap-4 overflow-clip">
                      <img
                        src={`http://localhost:3000/product/${e.product?.image}`}
                        alt="#"
                        className="object-scale-down h-20 aspect-video rounded-xl"
                      />
                      <div className="flex flex-col gap-4">
                        <div>
                          <h1 className="text-sm font-bold line-clamp-1">
                            {e.product?.title}
                          </h1>
                          <h1 className="text-xs line-clamp-1">
                            {e.product?.desc}
                          </h1>
                        </div>
                        <div>
                          <h1 className="text-sm line-clamp-1">
                            Dibeli: {e.quantity}
                          </h1>
                          <h1 className="text-sm line-clamp-1">
                            catatan: {e.note}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <h1 className="text-sm">{formatRupiah(e.total)}</h1>
                      <Button onPress={() => deleteCarts(e.id)}>Hapus</Button>
                    </div>
                  </div>
                </Checkbox>
              );
            })}
          </CheckboxGroup>
          <StickyBox
            offsetTop={104}
            offsetBottom={20}
            className="flex gap-5 p-10  h-fit  left-0 w-[500px] shadow-xl justify-center items-center flex-col  border rounded-xl"
          >
            <div className="flex flex-col items-center justify-center w-full gap-4 h-fit">
              <Select
                value={ongkir}
                onSelectionChange={setOngkir}
                label="Pengiriman"
                placeholder="Pilih Pengiriman"
                isRequired
              >
                {dataOngkir.map((e) => {
                  return (
                    <SelectItem
                      key={e.value}
                      value={e.value}
                      className="w-full"
                    >
                      {e.tipe}
                    </SelectItem>
                  );
                })}
              </Select>

              <h1>{dataUsers?.data?.address}</h1>
              <Button as={Link} href="/user/kelola-akun">
                Edit Alamat
              </Button>
              <div className="w-full">
                <h1 className="mb-4 font-bold text-center">Subtotal</h1>
                <div className="flex justify-between w-full">
                  <h1>Ongkir</h1>
                  <h1>{formatRupiah(ongkir.anchorKey ?? 0)}</h1>
                </div>
                <div className="flex justify-between w-full">
                  <h1>Produk</h1>
                  <h1>{formatRupiah(dataCartSelected?.data?.total ?? 0)}</h1>
                </div>
                <div className="flex justify-between w-full">
                  <h1>Total</h1>
                  <h1 className="">
                    {formatRupiah(
                      Number(dataCartSelected?.data?.total ?? 0) +
                        Number(ongkir.anchorKey ?? 0)
                    )}
                  </h1>
                </div>
              </div>
            </div>
            <Button fullWidth type="submit" color="primary">
              Checkout
            </Button>
          </StickyBox>
        </div>
      </form>
    </div>
  );
}

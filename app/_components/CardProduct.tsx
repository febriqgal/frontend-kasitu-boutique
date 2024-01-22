/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React from "react";
import { useGetProductApiQuery } from "../_redux/feature/productsSlice";
import { formatRupiah } from "../_constants/AppConfig";
import { Spinner } from "@nextui-org/react";

export default function CardProduct() {
  const { data, isLoading } = useGetProductApiQuery({});

  if (isLoading)
    return <Spinner className="flex items-center justify-center mt-4" />;

  return (
    <div className="grid grid-cols-6 gap-4">
      {data?.data?.map((e: any) => {
        return (
          <Link
            href={`/p/${e.id}`}
            key={e.id}
            className="flex flex-col border-2 shadow rounded-xl overflow-clip"
          >
            <div className="flex items-center justify-center w-full h-full overflow-clip bg-primary-100">
              <img src={`http://localhost:3000/product/${e.image}`} alt="#" />
            </div>
            <div className="w-full py-1 pl-2 text-sm text-white rounded-br-full bg-gradient-to-tr from-primary-900 to-primary-500 text-start">
              {`✅ Kasitu Boutique`}
            </div>
            <div className="px-2 py-2 text-start">
              <h1 className="text-xs line-clamp-2">{e.title}</h1>
              <div>
                <h1 className="pt-2 text-xs font-bold line-through">
                  {formatRupiah(e.price)}
                </h1>
                <h1 className="pb-2 font-bold">
                  {formatRupiah(e.price - (e.price * e.discount) / 100)}
                </h1>
              </div>
              <h1 className="px-2 py-1 mb-2 text-xs font-semibold rounded-md bg-primary-200 text-primary-900 w-fit">{`Diskon ${e.discount}%`}</h1>
              <h1 className="text-sm">{``}</h1>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

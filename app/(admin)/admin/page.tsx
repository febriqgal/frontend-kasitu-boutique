"use client";

import { useGetOrderApiQuery } from "@/app/_redux/feature/ordersSlice";
import { useGetProductApiQuery } from "@/app/_redux/feature/productsSlice";
import { useGetUserApiQuery } from "@/app/_redux/feature/usersSlice";

export default function AdminPage() {
  const { data: dataUser } = useGetUserApiQuery({});
  const { data: dataProduct } = useGetProductApiQuery({});
  const { data: dataOrder } = useGetOrderApiQuery({});
  return (
    <div className="grid grid-cols-3 gap-3 p-3">
      <div className="flex flex-col items-center justify-center h-32 rounded-xl bg-primary-200">
        <h1 className="font-bold">User Terdaftar</h1>
        <h1>{dataUser?.data.length}</h1>
      </div>
      <div className="flex flex-col items-center justify-center h-32 rounded-xl bg-primary-200">
        <h1 className="font-bold">Jumlah Produk</h1>
        <h1>{dataProduct?.data.length}</h1>
      </div>
      <div className="flex flex-col items-center justify-center h-32 rounded-xl bg-primary-200">
        <h1 className="font-bold">Produk Terjual</h1>
        <h1>{dataOrder?.data.length}</h1>
      </div>
    </div>
  );
}

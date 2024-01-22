"use client";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import BgLogin from "@/public/bg-login.avif";
import Image from "next/image";
import { AppConfig } from "@/app/_constants/AppConfig";

import toast from "react-hot-toast";
import { usePostUserMutation } from "@/app/_redux/feature/usersSlice";
interface IFormInput {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
}

export default function SignupPage() {
  const route = useRouter();
  const [loading, setLoading] = React.useState(false);
  const { register, handleSubmit } = useForm<IFormInput>();
  const [addNewUsers] = usePostUserMutation();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    await addNewUsers({
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      address: data.address,
      role: "user",
    }).then((res: any) => {
      if (res?.error?.status === 422) {
        setLoading(false);
        toast.error("Akun sudah terdaftar, silahkan login.");
      } else {
        setLoading(false);
        toast.success("Berhasil membuat akun, silahkan login.");
        route.replace("/login");
      }
    });
  };
  return (
    <section>
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <div className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            alt="Pattern"
            src={BgLogin}
            className="absolute inset-0 object-cover w-full h-full"
          />
        </div>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full gap-4 px-20"
          >
            <h1 className="mb-10 text-2xl text-center">
              Sign Up to{" "}
              <span className="font-bold text-primary">{AppConfig.title}</span>
            </h1>
            <div className="space-y-1">
              <Input
                type="text"
                color="primary"
                variant="bordered"
                size="sm"
                label="Nama"
                {...register("name", { required: true })}
              />
              <Input
                type="email"
                color="primary"
                variant="bordered"
                size="sm"
                label="email"
                {...register("email", { required: true })}
              />
              <Input
                type="password"
                color="primary"
                variant="bordered"
                size="sm"
                label="password"
                {...register("password", { required: true })}
              />
              <Input
                type="number"
                color="primary"
                variant="bordered"
                size="sm"
                label="No. HP."
                {...register("phone", { required: true })}
              />
              <Input
                type="text"
                color="primary"
                variant="bordered"
                size="sm"
                placeholder="exp: kel, kec, kota/kab, prov."
                label="Alamat"
                {...register("address", { required: true })}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Button
                isLoading={loading}
                type="submit"
                color="primary"
                fullWidth
              >
                Buat Akun
              </Button>
            </div>
          </form>
        </main>
      </div>
    </section>
  );
}

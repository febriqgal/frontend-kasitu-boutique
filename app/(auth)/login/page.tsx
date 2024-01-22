"use client";

import { AppConfig } from "@/app/_constants/AppConfig";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import BgLogin from "@/public/bg-login.avif";
import Image from "next/image";
import { useState } from "react";
interface IFormInput {
  email: string;
  password: string;
}
export default function LoginPage() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    const res = await axios.get(`${AppConfig.apiURL}/user/${data.email}`);
    if (
      res?.data?.data === null ||
      res.data?.data?.password !== data.password
    ) {
      toast.error("Email atau password salah");
    }
    if (res?.data?.data?.password === data.password) {
      signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: "/",
      });
    }
    setLoading(false);
  };
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            alt="Pattern"
            src={BgLogin}
            className="absolute inset-0 object-cover w-full h-full"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full gap-4 p-20 rounded-xl"
          >
            <h1 className="mb-10 text-2xl text-center">
              Welcome to{" "}
              <span className="font-bold text-primary">{AppConfig.title}</span>
            </h1>
            <div className="space-y-1">
              <Input
                type="email"
                color="primary"
                variant="bordered"
                size="sm"
                placeholder="email"
                {...register("email", { required: true })}
              />
              <Input
                type="password"
                color="primary"
                variant="bordered"
                size="sm"
                placeholder="password"
                {...register("password")}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Button
                isLoading={loading}
                type="submit"
                color="primary"
                fullWidth
              >
                Masuk
              </Button>
              <Button
                color="primary"
                variant="bordered"
                as={Link}
                href="/signup"
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

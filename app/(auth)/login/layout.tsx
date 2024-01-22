import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "react-hot-toast";
import { Metadata } from "next";
import { AppConfig } from "@/app/_constants/AppConfig";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: `Masuk - ${AppConfig.title}`,
  description: "Where Style Meets Elegance in Every Stitch.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="bottom-left" />
        {children}
      </body>
    </html>
  );
}

import { AppConfig } from "@/app/_constants/AppConfig";
import "@/app/globals.css";
import { Providers } from "@/app/providers";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: `Admin - ${AppConfig.title}`,
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
        <Providers>
          <Toaster position="bottom-left" />
          {children}
        </Providers>
      </body>
    </html>
  );
}

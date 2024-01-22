import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "react-hot-toast";
import { Metadata } from "next";
import { AppConfig } from "@/app/_constants/AppConfig";
import { Providers } from "@/app/providers";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: `User - ${AppConfig.title}`,
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

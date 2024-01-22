import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { Providers } from "../providers";
import NavbarMain from "../_components/NavbarMain";
import { AppConfig } from "../_constants/AppConfig";
import FooterMain from "../_components/FooterMain";
import { Toaster } from "react-hot-toast";

const poppins = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: AppConfig.title,
  description: "Where Style Meets Elegance in Every Stitch.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <NavbarMain />
          <Toaster position="bottom-center" />
          <main className="container mx-auto py-28">{children}</main>
          <FooterMain />
        </Providers>
      </body>
    </html>
  );
}

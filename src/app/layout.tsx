import DashboardLayout from "@/layouts/DashboardLayout";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { AnimatePresence } from "framer-motion";
import RecoilContextProvider from "./providers/recoilContextProvider";
import NextAuthSessionProvider from "./providers/nextAuthSessionProvider";
import Providers from "@/store/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins-extra-bold",
  display: "swap",
  weight: "800",
});

const poppinsRegular = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins-extra-bold",
  display: "swap",
  weight: "500",
});
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NextAuthSessionProvider>
        <body className={poppinsRegular.className}>
          <Providers>
            <RecoilContextProvider>
              <DashboardLayout>{children}</DashboardLayout>{" "}
            </RecoilContextProvider>
          </Providers>
        </body>
      </NextAuthSessionProvider>
    </html>
  );
}

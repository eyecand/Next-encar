import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import YandexMetrika from "@/components/shared/yandex-metrika";
import { Header } from "@/components/shared";
import { Footer } from "@/components/shared/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Autofish -- авто из Южной Кореи под заказ с сайта Енкар (Encar)",
  keywords:
    "Encar, Корея, авто из Кореи, аукционы Кореи, автомобиль из Кореи, купить машину из Кореи",
  description:
    "Autofish — экспортер автомобилей из Южной Кореи. Лучшие авто с Енкар (Encar) под заказ. Поможем купить авто с доставкой в Россию.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <link rel="icon" href="favicon.ico" /> */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>
          <Header />
          {children}
          <Footer />
          <Toaster />
          <YandexMetrika />
        </main>
      </body>
    </html>
  );
}

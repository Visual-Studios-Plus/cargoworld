import type { Metadata } from "next";
import { Cal_Sans, Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const calSans = Cal_Sans({
  variable: "--font-cal-sans",
  subsets: ["latin"],
  weight: "400",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Cargo World Wide — Sri Lanka to US, door to door",
  description:
    "Seamless door-to-door delivery from Colombo to our US warehouses and straight to your door.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${calSans.variable} ${syne.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white">{children}</body>
    </html>
  );
}

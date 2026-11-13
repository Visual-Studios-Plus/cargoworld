import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import SiteMotion from "./components/SiteMotion";
import Preloader from "./components/Preloader";

// Swiss corporate typography: Inter for text, a DIN-like condensed face for
// uppercase display headings.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const display = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600"],
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
      className={`${inter.variable} ${display.variable} h-full antialiased`}
      // The inline script below adds motion-hold before React hydrates.
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('motion-hold');setTimeout(function(){document.documentElement.classList.remove('motion-hold')},5000)",
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-[#ffffff]">
        <Preloader />
        <SiteMotion />
        {children}
      </body>
    </html>
  );
}

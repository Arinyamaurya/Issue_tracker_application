import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import "@radix-ui/themes/styles.css";
import {Theme , ThemePanel} from "@radix-ui/themes";
import "../styles/theme-config.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Issue Tracker App",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#000000] h-full">
      <body
        className={`${inter.variable} h-full`}>
        <Theme>
          <NavBar/>
          <main className="p-5  ">
        {children}
        </main>
        <ThemePanel/>
        </Theme>
      </body>
    </html>
  );
}

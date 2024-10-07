import "~/app/styles/globals.css";

import { Inter } from "next/font/google";

import Navbar from "~/components/Navbar";
import { Toaster } from "~/components/ui/toaster";

import { cn } from "~/lib/utils";
import { QueryProvider } from "~/context/QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const inter = Inter({
  subsets: ["latin"],
  // variable: "--font-sans",
});

export const metadata = {
  title: "weeklysharelist",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${cn('flex h-screen flex-col', inter.className)}`}>
        <QueryProvider>
            <Navbar />
            {children}
            <Toaster />
            {/* <ReactQueryDevtools initialIsOpen={false}/> */}
        </QueryProvider>
      </body>
    </html>
  );
}

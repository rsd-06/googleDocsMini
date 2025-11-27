import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { NuqsAdapter } from "nuqs/adapters/next/app";

import './globals.css';

const inter = Inter({
  subsets : ["latin"],
});

export const metadata: Metadata = {
  title: "Google Docs Mini",
  description: "A mini version of Google Docs built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <NuqsAdapter>
          {children}
        </NuqsAdapter>
      </body>
    </html>
  );
}

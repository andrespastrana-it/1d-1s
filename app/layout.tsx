import type React from "react";
import "./globals.css";

import { quicksand } from "@/fonts/fonts";

export const metadata = {
  title: "One Day, One History - A Journey Through Time",
  description:
    "Embark on a daily journey through history with captivating stories of courage, resilience, and human triumph.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body className={quicksand.className}>{children}</body>
    </html>
  );
}

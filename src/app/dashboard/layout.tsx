import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: {
    default: "Dashboard Temp",
    template: "%s | Dashbaord templa",
  },
  description: "this is decription",
};
export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-screen w-full">
      <Header />
      <div className="p-5">{children}</div>
      <Footer />
    </main>
  );
}

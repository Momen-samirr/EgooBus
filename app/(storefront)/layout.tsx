import { type ReactNode } from "react";
import { Navbar } from "../components/storefront/navbar";

export default function StorefrontLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {children}
      </main>
    </>
  );
}

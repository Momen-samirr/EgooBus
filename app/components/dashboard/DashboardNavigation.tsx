"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Banners",
    href: "/dashboard/banners",
  },
  {
    name: "Hunkel",
    href: "/dashboard/trips",
  },
];

export default function DashboardNavigation() {
  const pathName = usePathname();
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            link.href === pathName
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {link.name}
        </Link>
      ))}
    </>
  );
}

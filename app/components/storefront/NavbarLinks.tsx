import Link from "next/link";

export const links = [
  {
    id: 0,
    title: "Home",
    href: "/",
  },
  {
    id: 1,
    title: "Our partners",
    href: "/partners",
  },
  {
    id: 2,
    title: "About Us",
    href: "/about-us",
  },
  {
    id: 3,
    title: "Contact",
    href: "/contact-us",
  },
];

export function NavbarLinks() {
  return (
    <>
      {links.map((link) => (
        <Link href={link.href} key={link.id} className="font-medium">
          {link.title}
        </Link>
      ))}
    </>
  );
}

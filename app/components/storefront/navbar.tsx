import Link from "next/link";
import { NavbarLinks } from "./NavbarLinks";
import {
  getKindeServerSession,
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { LayoutDashboard } from "lucide-react";
import { UserDropdown } from "./UserDropdown";
import { Button } from "@/components/ui/button";

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-5">
      <div className="flex items-center">
        <Link href={"/"}>
          <h1 className="font-bold text-xl lg:text-3xl">
            Egoo<span className="text-primary">Bus</span>
          </h1>
        </Link>
        <NavbarLinks />
      </div>
      <div className="flex items-center">
        {user ? (
          <>
            <Link
              href={"/dashboard"}
              className=" relative group p-2 flex items-center mr-2"
            >
              <LayoutDashboard className=" h-6 w-6 text-gray-400 group-hover:text-gray-500" />
              <span className="absolute -top-3.5 right-1 text-xs bg-transparent text-primary w-6 h-6 flex items-center justify-center rounded-full p-2">
                New
              </span>
            </Link>
            <UserDropdown
              name={user.given_name as string}
              email={user.email as string}
              profileImage={
                user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
              }
            />
          </>
        ) : (
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-2">
            <Button variant={"ghost"} asChild>
              <LoginLink>Login</LoginLink>
            </Button>
            <span className="h-6 w-px bg-gray-200"></span>
            <Button asChild>
              <RegisterLink>Creat Account</RegisterLink>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}

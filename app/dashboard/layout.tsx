import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import DashboardNavigation from "../components/dashboard/DashboardNavigation";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
      <header className="sticky top-0 h-16 gap-6 flex items-center justify-between bg-white border-b">
        <nav className="hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <DashboardNavigation />
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <MenuIcon className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <nav className="flex flex-col gap-6 font-medium">
              <DashboardNavigation />
            </nav>
          </SheetContent>
        </Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"ghost"}
              className="relative w-10 h-10 rounded-full"
            >
              <Avatar>
                <AvatarImage
                  className="w-full h-full rounded-full object-cover"
                  src={"https://avatar.iran.liara.run/public/7"}
                  alt="Image"
                />
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button>
                <LogoutLink>Logout</LogoutLink>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="my-5">{children}</main>
    </div>
  );
}

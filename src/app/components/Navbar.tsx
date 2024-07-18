"use client";
import * as React from "react";
import { useTheme } from "next-themes";

import { Profile } from "./Profile";
import Logout from "./Logout";
import { ThemeSwitch } from "./ThemeSwitch";

import Link from "next/link";
import { CircleUser, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { GiFarmer } from "react-icons/gi";
import Image from "next/image";

export function Navbar() {
  const pathname = usePathname();
  const { theme } = useTheme();

  return (
    <header className="sticky top-0 flex h-16 z-50 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/home"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          {/* <GiFarmer className="h-6 w-6" /> */}
          {theme === "dark" ? (
            <Image
              src="/digitaldairy_logo_dark.png"
              width={90}
              height={90}
              alt="logo"
            />
          ) : (
            <Image
              src="/digitaldairy_logo_light.png"
              width={90}
              height={90}
              alt="logo"
            />
          )}
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link
          href="/home"
          className={`${
            pathname === "/home" ? "text-foreground" : "text-muted-foreground"
          } transition-colors hover:text-foreground`}
        >
          Home
        </Link>
        <Link
          href="/History"
          className={`${
            pathname === "/History"
              ? "text-foreground"
              : "text-muted-foreground"
          } transition-colors hover:text-foreground`}
        >
          History
        </Link>

        {/* <Link
          href="/news"
          className={`${
            pathname === "/news" ? "text-foreground" : "text-muted-foreground"
          } transition-colors hover:text-foreground`}
        >
          News
        </Link> */}
        <Link
          href="/About_us"
          className={`${
            pathname === "/About_us"
              ? "text-foreground"
              : "text-muted-foreground"
          } transition-colors hover:text-foreground whitespace-nowrap`}
        >
          {"About Us"}
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/home"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              {/* <GiFarmer className="h-6 w-6" /> */}
              {theme === "dark" ? (
                <Image
                  src="/digitaldairy_logo_dark.png"
                  width={40}
                  height={40}
                  alt="logo"
                />
              ) : (
                <Image
                  src="/digitaldairy_logo_light.png"
                  width={40}
                  height={40}
                  alt="logo"
                />
              )}
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              href="/home"
              className={`${
                pathname === "/home"
                  ? "text-foreground"
                  : "text-muted-foreground"
              } transition-colors hover:text-foreground`}
            >
              Home
            </Link>
            <Link
              href="/History"
              className={`${
                pathname === "/History"
                  ? "text-foreground"
                  : "text-muted-foreground"
              } transition-colors hover:text-foreground`}
            >
              History
            </Link>
            {/* <Link
              href="/news"
              className={`${
                pathname === "/news"
                  ? "text-foreground"
                  : "text-muted-foreground"
              } transition-colors hover:text-foreground`}
            >
              News
            </Link> */}
            <Link
              href="/About_us"
              className={`${
                pathname === "/About_us"
                  ? "text-foreground"
                  : "text-muted-foreground"
              } transition-colors hover:text-foreground`}
            >
              {"About Us"}
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              /> */}
          </div>
        </form>
        <ThemeSwitch />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
              <Profile />
            </div>
            <DropdownMenuSeparator />
            <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
              <Logout />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

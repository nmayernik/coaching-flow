"use client";

import { Bell, HelpCircle, Grip, Menu, UserRound } from "lucide-react";

const links = [
  "Home",
  "Presentations",
  "Appointments",
  "Questions",
  "Essay Reviews",
  "College Lists",
  "Resource Library",
];

export default function Header() {
  return (
    <header className="border-b border-gray-100 bg-white text-blue-800">
      <div className="flex h-16 items-center justify-between gap-4 px-4 md:h-14">
        <div className="flex min-w-0 items-center gap-2">
          <a href="/" aria-label="Bright Horizons home">
            <img
              src="/handoff-assets/header-logo.png"
              alt="Bright Horizons"
              className="h-auto w-[188px]"
              width="377"
              height="64"
            />
          </a>
          <span className="hidden text-base md:block">College Coach</span>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <span
            className="flex size-10 items-center justify-center"
            role="img"
            aria-label="Notifications"
          >
            <Bell className="size-6" aria-hidden />
          </span>
          <span
            className="hidden size-10 items-center justify-center md:flex"
            role="img"
            aria-label="Help"
          >
            <HelpCircle className="size-6" aria-hidden />
          </span>
          <span
            className="hidden size-10 items-center justify-center md:flex"
            role="img"
            aria-label="Applications"
          >
            <Grip className="size-6" aria-hidden />
          </span>
          <span
            className="hidden size-10 items-center justify-center md:flex"
            role="img"
            aria-label="Your profile"
          >
            <UserRound className="size-6" aria-hidden />
          </span>
          <span
            className="flex size-10 items-center justify-center md:hidden"
            role="img"
            aria-label="Menu"
          >
            <Menu className="size-6" aria-hidden />
          </span>
          <img
            src="/handoff-assets/employer-logo.png"
            alt="Employer"
            className="hidden h-10 w-[137px] object-contain md:block"
            width="256"
            height="79"
          />
        </div>
      </div>
      <nav
        aria-label="Main navigation"
        className="hidden h-[51px] items-stretch gap-2 overflow-x-auto px-4 md:flex"
      >
        {links.map((label) => (
          <a
            key={label}
            href={label === "Home" ? "/" : "#"}
            className={`flex shrink-0 items-center border-b-[3px] px-3 text-base ${label === "Home" ? "border-blue-500" : "border-transparent"}`}
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

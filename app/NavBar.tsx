"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex space-x-10 border-b border-zinc-800 mb-5 px-5 h-15 items-center bg-[#000319] text-white">
      <Link href="/">
        <AiFillBug className="text-blue-500 text-3xl " />
      </Link>
     
      <ul className="flex gap-5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={classnames(
                "transition-colors hover:text-indigo-400",
                {
                  "text-white font-semibold": link.href === currentPath,
                  "text-zinc-400": link.href !== currentPath,
                }
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      
    </nav>
  );
};

export default NavBar;

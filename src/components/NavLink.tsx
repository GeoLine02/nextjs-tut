"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface INavlinkProps {
  label: string;
  href: string;
}

const NavLink = ({ label, href }: INavlinkProps) => {
  const pathname = usePathname();

  return (
    <Link
      className={`nav-link ${pathname === href ? "nav-link-active" : ""}`}
      href={href}
    >
      {label}
    </Link>
  );
};

export default NavLink;

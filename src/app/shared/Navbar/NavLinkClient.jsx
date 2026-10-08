"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinkClient = ({ categories }) => {
  const pathname = usePathname();

  return (
    <nav className="mx-auto max-w-6xl overflow-x-auto px-4 pb-2">
      <ul className="flex w-max min-w-fullgap-1 md:w-full ">
        {categories.map((c) => {
          const active = pathname === `/category/${c.slug}`;
          return (
            <li key={c.id}>
              <Link
                href={`/pages/Category/${c.slug}`}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm transition ${
                  active
                    ? "bg-primary font-semibold text-white"
                    : "text-base-content/80 hover:bg-base-200"
                }`}
              >
                <span>{c.icon}</span>
                {c.nameBn}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavLinkClient;
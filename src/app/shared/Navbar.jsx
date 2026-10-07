"use client";
import React from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getCategories } from '@/utils/api';
import useAsync from "@/utils/useAsync";
import { bnDate } from "@/utils/format";
import UserMenu from "./userMenu";

const Navbar = () => {
        const pathname = usePathname();
  const { data: categories, loading } = useAsync(getCategories, []);
  const { data: session, isPending } = authClient.useSession();
  const [today, setToday] = useState("");

  useEffect(() => setToday(bnDate()), []);

  return (
    <div className="bg-base-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-lg bg-primary text-lg text-white">🛒</span>
          <span>
            <span className="block text-base font-bold leading-tight">বাজার সদাই</span>
            <span className="block min-h-[14px] text-[11px] text-base-content/60">{today}</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="skeleton h-8 w-24" />
          ) : session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <>
              <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">সাইন ইন</Link>
              <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">সাইন আপ</Link>
            </>
          )}
        </div>
      </div>

      <nav className="mx-auto max-w-6xl overflow-x-auto px-4 pb-2">
        <ul className="flex w-max min-w-full gap-1 md:w-full ">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <li key={i}><div className="skeleton h-7 w-16" /></li>
              ))
            : categories?.map((c) => {
                const active = pathname === `/category/${c.slug}`;
                return (
                  <li key={c.id}>
                    <Link
                      href={`/category/${c.slug}`}
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
    </div>
    );
};

export default Navbar;
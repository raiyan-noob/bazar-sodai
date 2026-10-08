import Link from "next/link";
import { Suspense } from "react";
import UserInfo from "./UserInfo";
import HeaderDate from "./HeaderDate";

const Header = () => {
  return (
    <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
      <Link href="/" className="flex items-center gap-2">
        <span className="grid size-9 place-items-center rounded-lg bg-primary text-lg text-white">🛒</span>
        <span>
          <span className="block text-base font-bold leading-tight">বাজার সদাই</span>
          <HeaderDate />
        </span>
      </Link>

      <Suspense fallback={<div className="skeleton h-8 w-28" />}>
        <UserInfo />
      </Suspense>
    </div>
  );
};

export default Header;
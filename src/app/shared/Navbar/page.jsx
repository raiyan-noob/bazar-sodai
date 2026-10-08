import { Suspense } from "react";
import Header from "./Header";
import NavLink from "./NavLink";
import Marquee from "./Marquee";

const Navbar = () => {
    return (
        <header className="border-b border-base-300 bg-base-100">
      <Header />
      <Suspense fallback={<div className="skeleton mx-auto mb-2 h-7 w-full max-w-6xl" />}>
        <NavLink />
      </Suspense>
      <Suspense fallback={<div className="skeleton h-8 w-full" />}>
        <Marquee />
      </Suspense>
    </header>
    );
};

export default Navbar;
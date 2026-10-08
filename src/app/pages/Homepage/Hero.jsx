import { bnDate } from "@/utils/format";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="grid  gap-6 rounded-2xl border border-base-300 bg-base-100 p-6 md:grid-cols-2 md:p-8">
      <div className="order-2 md:order-1">
        <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-primary">
          {bnDate()}
        </span>
        <h1 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">
          আজকের বাজারের দাম এক নজরে
        </h1>
        <p className="mt-3 text-sm text-base-content/70">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        {/* plain anchor: scrolls on the same page, no route change */}
        <a href="#সব-পণ্য" className="btn btn-primary btn-sm sm:btn-md mt-5">
          সব পণ্য দেখুন
        </a>
      </div>

      <div className="order-1 flex justify-center md:order-2 md:justify-end">
        <Image src="/bazar-hero.png" alt="Hero" width={220} height={120} />
      </div>
    </section>
  );
};

export default Hero;
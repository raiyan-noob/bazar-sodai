import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center">
      <p className="text-7xl font-extrabold text-primary">৪০৪</p>
      <h1 className="mt-3 text-xl font-bold">পেজটি খুঁজে পাওয়া যায়নি</h1>
      <p className="mt-1 text-sm text-base-content/60">
        আপনি যে পেজ বা পণ্যটি খুঁজছেন তা নেই, অথবা সরিয়ে নেওয়া হয়েছে।
      </p>
      <Link href="/" className="btn btn-primary mt-6">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
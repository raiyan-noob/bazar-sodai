import Link from "next/link";

const AuthCard = ({ title, subtitle, children }) => {
  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-center text-2xl font-bold">{title}</h1>
      <p className="mb-6 mt-1 text-center text-xs text-base-content/60">{subtitle}</p>
      <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">{children}</div>
      <p className="mt-6 text-center text-xs text-base-content/50">
        <Link href="/" className="hover:underline">← হোম পেজে ফিরে যান</Link>
      </p>
    </div>
  );
};

export default AuthCard;
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ChangeBadge from "../../../shared/ChangeBadge";
import { formatNumber, getDir, unitLabel, unitShort } from "@/utils/format";

const API = "https://api.api-store.workers.dev/api/bazardor";

const ProductDetailsContent = async ({ params }) => {
  const { slug } = await params;

  const res = await fetch(`${API}/products?slug=${encodeURIComponent(slug)}`, {
    next: { revalidate: 300 },
  });
  const data = res.ok ? await res.json() : [];
  const p = Array.isArray(data) ? data.find((x) => x.slug === slug) : null;

  if (!p) notFound();

  const dir = getDir(p.change);
  const diff = Math.abs(p.today - p.yesterday);
  const dirText = dir === "up" ? "বেড়েছে" : dir === "down" ? "কমেছে" : "অপরিবর্তিত";
  const markets = p.markets || [];

  const rows = markets
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.avg - b.avg);

  const minM = markets.length ? markets.reduce((a, m) => (m.min < a.min ? m : a)) : null;
  const maxM = markets.length ? markets.reduce((a, m) => (m.max > a.max ? m : a)) : null;
  const avgAll = rows.length ? rows.reduce((s, r) => s + r.avg, 0) / rows.length : p.today;

  const stats = [
    { label: "সর্বনিম্ন দাম", value: minM?.min ?? p.today, sub: minM ? `সবচেয়ে কম দামের বাজার: ${minM.market}` : "" },
    { label: "সর্বোচ্চ দাম", value: maxM?.max ?? p.today, sub: maxM ? `সবচেয়ে বেশি দামের বাজার: ${maxM.market}` : "" },
    { label: "গড় দাম", value: avgAll, sub: `${unitLabel(p.unit)} এর হিসাবে` },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-4 px-4 py-6">
      <nav className="text-xs text-base-content/60">
        <Link href="/" className="hover:underline">হোম</Link> ›{" "}
        <Link href={`/pages/Category/${p.category}`} className="hover:underline">{p.categoryNameBn}</Link> › {p.nameBn}
      </nav>

      {/* Summary */}
      <section className="flex flex-col gap-4 rounded-xl border border-base-300 bg-base-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="grid size-16 place-items-center rounded-xl bg-base-200 text-4xl">{p.image}</div>
          <div>
            <h1 className="text-2xl font-bold leading-tight">{p.nameBn}</h1>
            <p className="text-xs text-base-content/60">{unitLabel(p.unit)} · {p.categoryNameBn}</p>
            <p className="mt-3 text-xs text-base-content/70">
              গতকালের তুলনায় আজ দাম <b>{dirText}</b> · {formatNumber(diff)} টাকা
            </p>
        
          </div>
        </div>

        <div className="rounded-lg border border-base-300 p-3 text-center sm:min-w-32">
          <p className="text-[11px] text-base-content/60">আজকের দাম</p>
          <p className="text-2xl font-extrabold">{formatNumber(p.today)}</p>
          <p className="text-[11px] text-base-content/60">টাকা / {unitShort(p.unit)}</p>
          <ChangeBadge change={p.change} className="mt-1" />
        </div>
      </section>

      {/* Price summary */}
      <section className="rounded-xl border border-base-300 bg-base-100 p-5">
        <h2 className="mb-3 font-bold">দামের সারসংক্ষেপ</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-lg border border-base-300 p-3">
              <p className="text-[11px] text-base-content/60">{s.label}</p>
              <p className="text-xl font-bold text-primary">
                {formatNumber(s.value)} <span className="text-sm">টাকা</span>
              </p>
              <p className="text-[11px] text-base-content/60">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Market-wise table */}
      <section className="rounded-xl border border-base-300 bg-base-100 p-5">
        <h2 className="mb-3 font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto">
          <table className="table table-sm">
            <thead>
              <tr className="text-xs text-base-content/60">
                <th>বাজার</th>
                <th>বিভাগ</th>
                <th className="text-right">সর্বনিম্ন</th>
                <th className="text-right">সর্বাধিক</th>
                <th className="text-right">গড়</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((m) => (
                <tr key={`${m.market}-${m.division}`}>
                  <td className="whitespace-nowrap font-medium">{m.market}</td>
                  <td>{m.division}</td>
                  <td className="text-right">{formatNumber(m.min)} টাকা</td>
                  <td className="text-right">{formatNumber(m.max)} টাকা</td>
                  <td className="text-right font-semibold">{formatNumber(m.avg)} টাকা</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

const ProductDetails = ({ params }) => (
  <Suspense
    fallback={
      <div className="mx-auto max-w-4xl space-y-4 px-4 py-6">
        <div className="skeleton h-4 w-48" />
        <div className="skeleton h-40 w-full rounded-xl" />
        <div className="skeleton h-48 w-full rounded-xl" />
        <div className="skeleton h-64 w-full rounded-xl" />
      </div>
    }
  >
    <ProductDetailsContent params={params} />
  </Suspense>
);

export default ProductDetails;
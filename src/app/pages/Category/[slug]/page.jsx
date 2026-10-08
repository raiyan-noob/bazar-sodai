import { notFound } from "next/navigation";
import { Suspense } from "react";
import { toBn, toNum } from "@/utils/format";
import ProductGrid from "../../../shared/ProductGrid";
import SortSelect from "./SortSelect";

const API = "https://api.api-store.workers.dev/api/bazardor";

const CategoryContent = async ({ params, searchParams }) => {
  const { slug } = await params;
  const { sort = "default" } = await searchParams;

  const [catRes, prodRes] = await Promise.all([
    fetch(`${API}/categories`, { next: { revalidate: 300 } }),
    fetch(`${API}/products?category=${encodeURIComponent(slug)}`, { next: { revalidate: 300 } }),
  ]);

  const categories = catRes.ok ? await catRes.json() : [];
  const products = prodRes.ok ? await prodRes.json() : [];
  const category = categories.find((c) => c.slug === slug);

  // invalid slug or empty category → app/not-found.jsx
  if (!category || !Array.isArray(products) || products.length === 0) notFound();

  const list = [...products];
  if (sort === "asc") list.sort((a, b) => toNum(a.today) - toNum(b.today));
  if (sort === "desc") list.sort((a, b) => toNum(b.today) - toNum(a.today));

  return (
    <div className="mx-auto max-w-6xl space-y-4 px-4 py-6">
      <div className="flex items-center gap-3 rounded-xl border border-base-300 bg-base-100 p-4">
        <div className="grid size-12 place-items-center rounded-full bg-base-200 text-2xl">{category.icon}</div>
        <div>
          <h1 className="text-xl font-bold leading-tight">{category.nameBn}</h1>
          <p className="text-xs text-base-content/60">প্রতিটি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </div>

      <div className="flex justify-end rounded-xl border border-base-300 bg-base-100 p-3">
        <SortSelect value={sort} />
      </div>

      <p className="text-xs text-base-content/60">মোট {toBn(list.length)}টি পণ্য দেখানো হচ্ছে</p>
      <ProductGrid products={list} />
    </div>
  );
};

const Category = ({ params, searchParams }) => (
  <Suspense fallback={<div className="mx-auto max-w-6xl space-y-4 px-4 py-6">
    <div className="skeleton h-20 w-full rounded-xl" />
    <div className="skeleton h-12 w-full rounded-xl" />
    <div className="skeleton h-64 w-full rounded-xl" />
  </div>}>
    <CategoryContent params={params} searchParams={searchParams} />
  </Suspense>
);

export default Category;
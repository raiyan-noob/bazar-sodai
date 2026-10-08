import { toBn, toNum } from "@/utils/format";
import ProductGrid from "../../shared/ProductGrid";
import Hero from "./Hero";
import ProductSection from "./ProductSection";

const API = "https://api.api-store.workers.dev/api/bazardor";

const HomePage = async () => {
  const res = await fetch(`${API}/products`);
  const products = res.ok ? await res.json() : [];

  const risers = products
    .filter((p) => p.change?.dir === "up" && toNum(p.change.pct) > 0)
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change?.dir === "down" && toNum(p.change.pct) < 0)
    .sort((a, b) => toNum(a.change.pct) - toNum(b.change.pct))
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-6">
      <Hero />

      {!res.ok && (
        <div role="alert" className="alert alert-error alert-soft">
          ডেটা লোড করা যায়নি। পেজটি রিফ্রেশ করে আবার চেষ্টা করুন।
        </div>
      )}

      <ProductSection title="আজ দাম বেড়েছে" marker="▲" markerClass="text-red-600" products={risers} />
      <ProductSection title="আজ দাম কমেছে" marker="▼" markerClass="text-green-600" products={fallers} />

      <section id="সব-পণ্য" className="scroll-target">
        <h2 className="text-lg font-bold">সব পণ্য</h2>
        <p className="mb-3 text-xs text-base-content/60">
          মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>
        <ProductGrid products={products} />
      </section>
    </div>
  );
};

export default HomePage;
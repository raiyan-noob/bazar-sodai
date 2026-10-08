import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import { formatNumber, formatPct, getDir, unitShort } from "@/utils/format";
import Link from "next/link";

const API = "https://api.api-store.workers.dev/api/bazardor";

const Marquee = async () => {
  const res = await fetch(`${API}/products`);
  const products = res.ok ? await res.json() : [];

  if (!products.length) return null;

  return (
    <div className="border-t border-base-300 bg-base-100 py-2">
      <MarqueeText direction="right" duration={40} className="text-xs">
        {products.map((p) => {
          const dir = getDir(p.change);
          return (
            
              <span
                key={p.id}
                className="flex items-center gap-1.5 whitespace-nowrap border-r border-base-300 px-4"
              >
                <Link className="hover:underline" href = {`/pages/product/${p.slug}`}>
                <span>{p.image}</span>
              <span className="font-medium">{p.nameBn}  </span>
              <span className="text-base-content/70">
                {formatNumber(p.today)} টাকা/{unitShort(p.unit)}
              </span>
              {dir === "up" && (
                <span className="font-semibold text-red-600"> ▲ {formatPct(p.change.pct)}%</span>
              )}
              {dir === "down" && (
                <span className="font-semibold text-green-600"> ▼ {formatPct(p.change.pct)}%</span>
              )}
              {dir === "flat" && <span className="text-gray-500"> — ০.০%</span>}
              </Link>
            </span>
            
          );
        })}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
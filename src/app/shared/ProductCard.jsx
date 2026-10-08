import Link from "next/link";
import ChangeBadge from "./ChangeBadge";
import { formatNumber, unitLabel } from "@/utils/format";

const ProductCard = ({ product }) => {
  return (
    <Link
      href={`/pages/product/${product.slug}`}
      className="block rounded-xl border border-base-300 bg-base-100 p-3.5 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="grid size-11 place-items-center rounded-lg bg-base-200 text-2xl">{product.image}</div>
        <div className="min-w-0">
          <h3 className="truncate font-semibold leading-tight">{product.nameBn}</h3>
          <p className="text-xs text-base-content/60">{unitLabel(product.unit)}</p>
        </div>
      </div>

      <p className="mt-3 text-[11px] text-base-content/60">আজকের দাম</p>
      <div className="flex items-end justify-between">
        <p className="text-lg font-bold">
          {formatNumber(product.today)} <span className="text-sm font-semibold">টাকা</span>
        </p>
        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
};

export default ProductCard;
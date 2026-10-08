import { formatPct, getDir } from "@/utils/format";

// Colors follow the Figma: price up = red, price down = green.
// For "green up / red down" from the text spec, swap the up/down classes.
const STYLES = {
  up: "bg-red-50 text-red-600",
  down: "bg-green-50 text-green-600",
  flat: "bg-gray-100 text-gray-500",
};

const ChangeBadge = ({ change, className = "" }) => {
  const dir = getDir(change);
  const text =
    dir === "up" ? `▲ ${formatPct(change.pct)}%`
    : dir === "down" ? `▼ ${formatPct(Math.abs(change.pct))}%`
    : "— ০.০%";

  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${STYLES[dir]} ${className}`}>
      {text}
    </span>
  );
};

export default ChangeBadge;
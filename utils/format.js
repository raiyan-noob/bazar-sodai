const BN = "০১২৩৪৫৬৭৮৯";

export const toBn = (v) => String(v).replace(/\d/g, (d) => BN[d]);
export const toEn = (v) => String(v).replace(/[০-৯]/g, (d) => BN.indexOf(d));

// Works with numbers AND Bengali-digit strings (for correct numeric sorting)
export const toNum = (v) =>
  typeof v === "number" ? v : parseFloat(toEn(v).replace(/,/g, "")) || 0;

export function formatNumber(v) {
  const n = toNum(v);
  const frac = !Number.isInteger(n);
  return toBn(
    n.toLocaleString("en-US", {
      minimumFractionDigits: frac ? 2 : 0,
      maximumFractionDigits: 2,
    })
  );
}

export const formatPct = (p) => toBn(Number(p).toFixed(1));

const UNITS = {
  kg: "কেজি",
  liter: "লিটার",
  litre: "লিটার",
  l: "লিটার",
  dozen: "ডজন",
  doz: "ডজন",
  piece: "পিস",
  pc: "পিস",
  pcs: "পিস",
};
export const unitShort = (u) => UNITS[String(u).toLowerCase()] || u;
export const unitLabel = (u) => `প্রতি ${unitShort(u)}`;

export function getDir(change) {
  if (!change || !change.pct) return "flat";
  return change.dir === "up" || change.dir === "down" ? change.dir : "flat";
}

export const bnDate = () =>
  new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
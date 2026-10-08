"use client";

import { usePathname, useRouter } from "next/navigation";

const OPTIONS = [
  { value: "default", label: "ডিফল্ট" },
  { value: "asc", label: "দাম: কম থেকে বেশি" },
  { value: "desc", label: "দাম: বেশি থেকে কম" },
];

export default function SortSelect({ value = "default" }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e) => {
    const v = e.target.value;
    router.push(v === "default" ? pathname : `${pathname}?sort=${v}`);
  };

  return (
    <label className="flex items-center gap-2 text-xs text-base-content/70">
      সাজান
      <span className="relative">
        <select
          value={value}
          onChange={handleChange}
          className="appearance-none rounded-lg border border-base-300 bg-base-100 py-1.5 pl-3 pr-8 text-xs text-base-content outline-none focus:border-primary"
        >
          {OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <svg viewBox="0 0 20 20" aria-hidden="true" className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-base-content/60" fill="currentColor">
          <path d="M5.3 7.3a1 1 0 011.4 0L10 10.6l3.3-3.3a1 1 0 111.4 1.4l-4 4a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4z" />
        </svg>
      </span>
    </label>
  );
}
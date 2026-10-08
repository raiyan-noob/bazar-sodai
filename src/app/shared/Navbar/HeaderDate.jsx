"use client";

import { useEffect, useState } from "react";
import { bnDate } from "@/utils/format";

const HeaderDate = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setDate(bnDate(new Date()));
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return <span className="block text-[11px] text-base-content/60">{date}</span>;
};

export default HeaderDate;

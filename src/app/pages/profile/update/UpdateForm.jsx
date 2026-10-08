"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateForm({ defaultName }) {
  const router = useRouter();
  const [name, setName] = useState(defaultName || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("নাম লিখুন");

    setIsSubmitting(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setIsSubmitting(false);

    if (error) return toast.error(error.message || "আপডেট করা যায়নি");

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/pages/profile");
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-xl border border-base-300 bg-base-100 p-5">
      <div>
        <label className="mb-1 block text-xs font-medium">নাম</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="আপনার নাম"
          className="input input-bordered w-full"
        />
      </div>
      <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">
        {isSubmitting && <span className="loading loading-spinner loading-sm" />}
        আপডেট
      </button>
    </form>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignInForm({ target, fromProtected }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // toast for protected-route redirects
  useEffect(() => {
    if (fromProtected) {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "auth-redirect" });
    }
  }, [fromProtected]);

  const fail = (msg) => {
    setMessage(msg);
    toast.error(msg);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString().trim() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    if (!email || !password) return fail("সব ঘর পূরণ করুন");
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) return fail("সঠিক ইমেইল দিন");
    if (password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");

    setMessage("");
    setIsSubmitting(true);

    try {
      const { error } = await authClient.signIn.email({ email, password, rememberMe: true });

      if (error) {
        return fail(error.status === 401 ? "ইমেইল বা পাসওয়ার্ড ভুল" : "সাইন ইন করা যায়নি, আবার চেষ্টা করুন");
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে");
      router.replace(target);
      router.refresh();
    } catch (err) {
      console.error("Sign in request failed:", err);
      fail("সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label className="mb-1 block text-xs font-medium">ইমেইল</label>
        <input type="email" name="email" required placeholder="you@example.com" className="input input-bordered w-full" />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium">পাসওয়ার্ড</label>
        <input type="password" name="password" required minLength={8} placeholder="কমপক্ষে ৮ অক্ষর" className="input input-bordered w-full" />
      </div>

      {message && <p role="alert" className="text-xs text-red-600">{message}</p>}

      <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">
        {isSubmitting && <span className="loading loading-spinner loading-sm" />}
        সাইন ইন
      </button>
    </form>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignUpForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fail = (msg) => {
    setMessage(msg);
    toast.error(msg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = Object.fromEntries(new FormData(e.currentTarget).entries());
    const name = v.name?.trim();

    if (!name || !v.email || !v.password) return fail("সব ঘর পূরণ করুন");
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(v.email)) return fail("সঠিক ইমেইল দিন");
    if (v.password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (v.password !== v.confirm) return fail("পাসওয়ার্ড দুটি মিলছে না");

    setMessage("");
    setIsSubmitting(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email: v.email,
        password: v.password,
      });

      if (error) {
        return fail(
          error.status === 422
            ? "এই ইমেইলে আগেই অ্যাকাউন্ট আছে, সাইন ইন করুন"
            : error.message || "অ্যাকাউন্ট তৈরি করা যায়নি"
        );
      }

      toast.success("অ্যাকাউন্ট তৈরি সফল হয়েছে!");
      router.refresh();
      router.push("/");
    } catch (err) {
      console.error("Sign up request failed:", err);
      fail("সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না");
    } finally {
      setIsSubmitting(false);
    }
  };

  const field = (label, name, type, placeholder) => (
    <div>
      <label className="mb-1 block text-xs font-medium">{label}</label>
      <input type={type} name={name} required placeholder={placeholder} className="input input-bordered w-full" />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {field("নাম", "name", "text", "যেমন: রহিম উদ্দিন")}
      {field("ইমেইল", "email", "email", "you@example.com")}
      {field("পাসওয়ার্ড", "password", "password", "কমপক্ষে ৮ অক্ষর")}
      {field("পাসওয়ার্ড নিশ্চিত করুন", "confirm", "password", "আবার লিখুন")}

      {message && <p role="alert" className="text-xs text-red-600">{message}</p>}

      <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">
        {isSubmitting && <span className="loading loading-spinner loading-sm" />}
        অ্যাকাউন্ট তৈরি করুন
      </button>
    </form>
  );
}
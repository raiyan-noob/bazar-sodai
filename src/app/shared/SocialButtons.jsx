"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true" className="size-4">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.73 6C44.43 38.05 46.98 31.88 46.98 24.55Z" />
    <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.53 2.56 10.78l7.97-6.19Z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.73-6c-2.14 1.44-4.89 2.3-8.17 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4" fill="currentColor">
    <path d="M12 .3a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0012 .3" />
  </svg>
);

export default function SocialButtons({ callbackURL = "/" }) {
  const [loading, setLoading] = useState("");

  const handleSocial = async (provider) => {
    setLoading(provider);
    try {
      const { error } = await authClient.signIn.social({ provider, callbackURL });
      if (error) {
        toast.error(error.message || "সোশ্যাল লগইন ব্যর্থ হয়েছে");
        setLoading("");
      }
    } catch {
      toast.error("সোশ্যাল লগইন ব্যর্থ হয়েছে");
      setLoading("");
    }
  };

  return (
    <>
      <div className="divider my-4 text-xs text-base-content/50">অথবা</div>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => handleSocial("google")}
          disabled={!!loading}
          className="btn btn-outline btn-sm sm:btn-md border-base-300 text-xs font-medium"
        >
          {loading === "google" ? <span className="loading loading-spinner loading-xs" /> : <GoogleIcon />}
          Google দিয়ে চালিয়ে যান
        </button>
        <button
          type="button"
          onClick={() => handleSocial("github")}
          disabled={!!loading}
          className="btn btn-outline btn-sm sm:btn-md border-base-300 text-xs font-medium"
        >
          {loading === "github" ? <span className="loading loading-spinner loading-xs" /> : <GithubIcon />}
          GitHub দিয়ে চালিয়ে যান
        </button>
      </div>
    </>
  );
}
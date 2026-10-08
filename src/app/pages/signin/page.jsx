import Link from "next/link";
import { Suspense } from "react";
import AuthCard from "../../shared/AuthCard";
import SocialButtons from "../../shared/SocialButtons";
import SignInForm from "./SignInForm";

const SignInContent = async ({ searchParams }) => {
  const { redirect } = await searchParams;
  const target =
    redirect && redirect.startsWith("/") && !redirect.startsWith("//") ? redirect : "/";

  return (
    <AuthCard title="সাইন ইন" subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।">
      <SignInForm target={target} fromProtected={target !== "/"} />
      <SocialButtons callbackURL={target} />
      <p className="mt-4 text-center text-xs">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/pages/signup" className="font-medium text-primary hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </AuthCard>
  );
};

const SignIn = ({ searchParams }) => (
  <Suspense
    fallback={
      <AuthCard title="সাইন ইন" subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।">
        <div className="space-y-3">
          <div className="skeleton h-10 w-full" />
          <div className="skeleton h-10 w-full" />
          <div className="skeleton h-10 w-full" />
        </div>
      </AuthCard>
    }
  >
    <SignInContent searchParams={searchParams} />
  </Suspense>
);

export default SignIn;
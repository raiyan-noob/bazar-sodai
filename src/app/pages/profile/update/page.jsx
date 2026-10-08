import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getAuth } from "@/lib/auth";
import UpdateForm from "./UpdateForm";

export const instant = false;

const UpdateProfileContent = async () => {
  const session = await getAuth().api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?redirect=/pages/profile/update");

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
      <p className="mb-4 text-xs text-base-content/60">আপনার নাম পরিবর্তন করুন।</p>

      <UpdateForm defaultName={session.user.name} />

      <p className="mt-4 text-center text-xs">
        <Link href="/pages/profile" className="text-base-content/60 hover:underline">
          ← প্রোফাইলে ফিরে যান
        </Link>
      </p>
    </div>
  );
};

const UpdateProfile = () => (
  <Suspense
    fallback={
      <div className="mx-auto max-w-xl space-y-4 px-4 py-8">
        <div className="skeleton h-8 w-48" />
        <div className="skeleton h-4 w-40" />
        <div className="skeleton h-12 w-full rounded-lg" />
      </div>
    }
  >
    <UpdateProfileContent />
  </Suspense>
);

export default UpdateProfile;
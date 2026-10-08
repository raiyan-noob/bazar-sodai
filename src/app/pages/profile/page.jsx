import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getAuth } from "@/lib/auth";
import Avatar from "../../shared/Avatar";
import SignOutButton from "../../shared/SignOutButton";

export const instant = false;

const ProfileContent = async () => {
  const session = await getAuth().api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?redirect=/pages/profile");

  const user = session.user;

  return (
    <div className="mx-auto max-w-xl space-y-4 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-xs text-base-content/60">আপনার অ্যাকাউন্টের তথ্য এখান থেকে দেখুন।</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-base-300 bg-base-100 p-4">
        <div className="flex items-center gap-3">
          <Avatar user={user} size="size-16" />
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-xs text-base-content/60">{user.email}</p>
          </div>
        </div>
        <SignOutButton className="btn btn-outline btn-error btn-sm" />
      </div>

      <div className="rounded-xl border border-base-300 bg-base-100 p-4">
        <h2 className="mb-3 font-semibold">তথ্য</h2>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-base-content/60">নাম</dt>
            <dd>{user.name}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-base-content/60">ইমেইল</dt>
            <dd>{user.email}</dd>
          </div>
        </dl>
        <Link href="/pages/profile/update" className="btn btn-primary mt-4 w-full">
          তথ্য আপডেট করুন
        </Link>
        <p className="mt-4 text-center text-xs">
        <Link href="/" className="text-base-content/60 hover:underline">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
      </div>
    </div>
  );
};

const Profile = () => (
  <Suspense
    fallback={
      <div className="mx-auto max-w-xl space-y-4 px-4 py-8">
        <div className="skeleton h-8 w-40" />
        <div className="skeleton h-24 w-full rounded-xl" />
        <div className="skeleton h-48 w-full rounded-xl" />
      </div>
    }
  >
    <ProfileContent />
  </Suspense>
);

export default Profile;
import Link from "next/link";
import { headers } from "next/headers";
import { connection } from "next/server";
import { getAuth } from "@/lib/auth";
import Avatar from "../Avatar";
import SignOutButton from "../SignOutButton";

const UserInfo = async () => {
  await connection();
  const session = await getAuth().api.getSession({ headers: await headers() });
  const user = session?.user;

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/pages/signin" className="btn btn-ghost btn-sm sm:btn-md">সাইন ইন</Link>
        <Link href="/pages/signup" className="btn btn-primary btn-sm sm:btn-md">সাইন আপ</Link>
      </div>
    );
  }

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 hover:bg-base-200">
        <Avatar user={user} />
        <span className="hidden text-sm font-medium sm:inline">{user.name}</span>
        <span className="text-[10px] text-base-content/50">▾</span>
      </div>

      <div tabIndex={0} className="dropdown-content z-50 mt-2 w-60 rounded-xl border border-base-300 bg-base-100 p-3 shadow-lg">
        <p className="text-sm font-semibold">{user.name}</p>
        <p className="mb-2 truncate text-xs text-base-content/60">{user.email}</p>
        <div className="divider my-1" />
        <Link href="/pages/profile" className="block rounded-md px-2 py-1.5 text-sm hover:bg-base-200">
          👤 আমার প্রোফাইল
        </Link>
        <SignOutButton className="w-full rounded-md px-2 py-1.5 text-left text-sm text-red-600 hover:bg-red-50" />
      </div>
    </div>
  );
};

export default UserInfo;
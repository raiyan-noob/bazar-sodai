import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";

export async function proxy(request) {
  const session = await getAuth().api.getSession({ headers: request.headers });

  if (!session) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/pages/product/:path*", "/profile/:path*"],
};
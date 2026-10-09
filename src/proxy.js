import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";

export async function proxy(request) {
  const session = await getAuth().api.getSession({ headers: request.headers });

  if (session) return NextResponse.next();

  const signInUrl = new URL('/pages/signin', request.url);
  signInUrl.searchParams.set('redirect', `${request.nextUrl.pathname}${request.nextUrl.search}`);
  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: ["/pages/product/:path*", "/pages/profile/:path*" ] 
};
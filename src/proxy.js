import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function proxy(request) {
  const signInUrl = new URL('/pages/signin', request.url);
  signInUrl.searchParams.set('redirect', `${request.nextUrl.pathname}${request.nextUrl.search}`);
  return NextResponse.redirect(signInUrl)
}
 
export const config = {
  matcher: '/pages/product/:path*',
}
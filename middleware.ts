// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  console.log("🧠 Middleware exécuté !");

  const userId = request.cookies.get('user_id')?.value;
  const isDashboardPath = request.nextUrl.pathname.startsWith('/dashboard');

  if (isDashboardPath && !userId) {
    console.log("🔒 Pas connecté → redirection vers /login");
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};

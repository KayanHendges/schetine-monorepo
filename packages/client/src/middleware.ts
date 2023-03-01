import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { publicRoutes } from "src/config/routes";

export async function middleware({ nextUrl, url, cookies }: NextRequest) {
  const token = cookies.get("auth.token");

  if (publicRoutes.includes(nextUrl.pathname)) {
    if (!token) return;
    nextUrl.pathname = "/";
    return NextResponse.redirect(nextUrl);
  }

  if (!token) {
    nextUrl.pathname = "/login";
    return NextResponse.redirect(nextUrl);
  }

  return;
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};

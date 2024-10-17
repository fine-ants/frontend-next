import { NextRequest, NextResponse } from "next/server";
import Routes from "./constants/Routes";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");

  const isAuthenticated = accessToken && refreshToken;

  if (
    isAuthenticated &&
    ["/", "/signin", "/signup"].includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL(Routes.DASHBOARD, request.url));
  }

  if (!isAuthenticated && request.nextUrl.pathname === Routes.DASHBOARD) {
    return NextResponse.redirect(new URL(Routes.SIGNIN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signin", "/signup", "/dashboard"],
};

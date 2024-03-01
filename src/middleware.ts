import { NextRequest, NextResponse } from "next/server";
import { addXUrlHeader } from "./middlewares/addXUrlHeader";

// Nextjs needs to re-render to update the route state to avoid hydration mismatch https://github.com/vercel/next.js/issues/38267#issuecomment-1177907315
async function appMiddleware(request: NextRequest) {
  // console.log("appMiddleware middleware");
  // It's IMPORTANT to keep the if statements in order
  // /login || /register
  if (request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/register")) {
    // Redirect to home if has access token
    if (request.cookies.has(process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY)) {
      return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_BASE_URL).href);
    }
    return NextResponse.next();
  }

  // /logout
  if (request.nextUrl.pathname.startsWith("/logout")) {
    const callbackUrl = request.nextUrl.searchParams.get("callbackUrl") ?? process.env.NEXT_PUBLIC_BASE_URL;
    const response = NextResponse.redirect(callbackUrl);
    response.cookies.delete(process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY);
    response.cookies.delete(process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY);
    return response;
  }

  // /authenticate
  if (request.nextUrl.pathname.startsWith("/authenticate")) {
    const callbackUrl =
      request.nextUrl.searchParams.get("callbackUrl") ?? new URL("", process.env.NEXT_PUBLIC_BASE_URL).href;
    const accessToken = request.nextUrl.searchParams.get("accessToken")!;
    const refreshToken = request.nextUrl.searchParams.get("refreshToken")!;
    const response = NextResponse.redirect(callbackUrl);
    response.cookies.set(process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY, accessToken, {
      maxAge: Number(process.env.ACCESS_TOKEN_TTL),
      sameSite: "strict",
    });
    response.cookies.set(process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY, refreshToken, {
      maxAge: Number(process.env.REFRESH_TOKEN_TTL),
      sameSite: "strict",
    });
    return response;
  }

  // No access token
  if (!request.cookies.has(process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY)) {
    // Logout if no access token and no refresh token
    if (!request.cookies.has(process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY)) {
      return NextResponse.redirect(new URL("login", process.env.NEXT_PUBLIC_BASE_URL).href);
    }
    // Refresh token
    // Had to use a route handler because some functions don't work on edge runtime
    try {
      const url = new URL("api/refresh-token", process.env.NEXT_PUBLIC_BASE_URL);
      url.searchParams.append("refreshToken", request.cookies.get(process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY)!.value);
      const res = await fetch(url.href);
      if (!res.ok) {
        return NextResponse.redirect(new URL("logout", process.env.NEXT_PUBLIC_BASE_URL).href);
      }
      const data = await res.json();
      const authUrl = new URL("authenticate", process.env.NEXT_PUBLIC_BASE_URL);
      authUrl.searchParams.append("accessToken", data.accessToken);
      authUrl.searchParams.append("refreshToken", data.refreshToken);
      authUrl.searchParams.append("callbackUrl", request.nextUrl.href);
      return NextResponse.redirect(authUrl.href);
    } catch (error) {
      return NextResponse.redirect(new URL("logout", process.env.NEXT_PUBLIC_BASE_URL).href);
    }
  }

  return NextResponse.next();
}

// export default addXUrlHeader(auth(refreshToken(appMiddleware)));
export default addXUrlHeader(appMiddleware);

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|forgot-password|reset-password).*)",
};

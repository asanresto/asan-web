"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const login = async ({ email, password }: { email: string; password: string }) => {
  const loginUrl = new URL("authenticate", process.env.NEXT_PUBLIC_BASE_URL);
  const defaultCallbackUrl = new URL("/", process.env.NEXT_PUBLIC_BASE_URL);
  let callbackUrl = defaultCallbackUrl.href;
  const referrer = headers().get("referer");
  if (referrer) {
    const callbackUrl1 = new URL(referrer).searchParams.get("callbackUrl");
    if (callbackUrl1) {
      callbackUrl = callbackUrl1;
    }
  }
  loginUrl.searchParams.append("callbackUrl", callbackUrl);
  loginUrl.searchParams.append("accessToken", "access_token");
  loginUrl.searchParams.append("refreshToken", "refresh_token");
  redirect(loginUrl.href);
};

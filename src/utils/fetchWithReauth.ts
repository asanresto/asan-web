"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export const fetchWithReauth = async (input: string | URL | Request, init?: RequestInit) => {
  const res = await fetch(input, init);
  const data: { data: any; errors?: { extensions?: { originalError: { message: string }; message?: string } }[] } =
    await res.json();
  if (
    data.errors?.some((item) => {
      return item.extensions?.originalError.message === "Unauthorized";
    })
  ) {
    const refreshToken = cookies().get(process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY)?.value;
    if (refreshToken) {
      const url = new URL("api/refresh-token", process.env.NEXT_PUBLIC_BASE_URL);
      url.searchParams.append("refreshToken", refreshToken);
      const res = await fetch(url.href);
      if (!res.ok) {
        redirect("/logout");
      }
      const data = await res.json();
      const authUrl = new URL("authenticate", process.env.NEXT_PUBLIC_BASE_URL);
      authUrl.searchParams.append("accessToken", data.accessToken);
      authUrl.searchParams.append("refreshToken", data.refreshToken);
      authUrl.searchParams.append("callbackUrl", headers().get("x-url") ?? "");
      redirect(authUrl.href);
    } else {
      redirect("/logout");
    }
  }
  return data;
};

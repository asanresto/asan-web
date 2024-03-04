"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export const fetchWithReauth = async (input: string | URL | Request, init?: RequestInit) => {
  const res = await fetch(input, init);
  const data: {
    data: any;
    errors?: { extensions?: { originalError: { message: string }; message?: string }; message?: string }[];
  } = await res.json();
  if (
    data.errors?.some((item) => {
      return item.message === "unauthorized" || item.extensions?.originalError.message === "Unauthorized";
    })
  ) {
    const refreshToken = cookies().get(process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY)?.value;
    if (refreshToken) {
      const res = await fetch(new URL("query", process.env.NEXT_PUBLIC_API_URL), {
        next: { revalidate: 0 },
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          query: `
            mutation {
              refreshToken(refreshToken: "${refreshToken}") {
                accessToken
                accessTokenTtl
                refreshToken
                refreshTokenTtl
              }
            }
          `,
        }),
      });
      const data = await res.json();
      if (!data.data?.refreshToken) {
        redirect("/logout");
      }
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

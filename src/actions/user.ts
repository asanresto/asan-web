"use server";

import { cookies } from "next/headers";
import { CombinedError } from "urql";

import { MeQuery } from "@/graphql/types";
import { fetchWithReauth } from "@/utils/fetchWithReauth";

export const getMe = async (): Promise<{ data?: MeQuery; error?: CombinedError }> => {
  const data = await fetchWithReauth(new URL("query", process.env.NEXT_PUBLIC_API_URL), {
    next: { tags: ["me"], revalidate: 60 },
    credentials: "include",
    headers: {
      Authorization: `Bearer ${cookies().get(process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY)?.value}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      query: `
        {
          me {
            id
            name
            email
            avatarUrl
          }
        }
      `,
    }),
  });
  if (data.data?.me?.id) {
    try {
      cookies().set(process.env.NEXT_PUBLIC_USER_ID_KEY, data.data.me?.id);
    } catch {}
  }
  return data;
};

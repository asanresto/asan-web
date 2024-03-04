"use server";

import { fetchWithReauth } from "@/utils/fetchWithReauth";
import { cookies } from "next/headers";

export const getMe = async () => {
  return await fetchWithReauth(new URL("query", process.env.NEXT_PUBLIC_API_URL), {
    next: { tags: ["me"], revalidate: 60 },
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
};

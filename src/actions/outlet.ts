"use server";

import { fetchWithReauth } from "@/utils/fetchWithReauth";
import { cookies } from "next/headers";

export const getOutlets = async ({ itemsPerPage, page }: { itemsPerPage: number; page: number }) => {
  const payload = await fetchWithReauth(new URL("api/graphql", process.env.NEXT_PUBLIC_BASE_URL), {
    next: {
      revalidate: 60,
      tags: ["outlets"],
    },
    headers: {
      Authorization: `Bearer ${cookies().get(process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY)?.value}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      query: `
        query GetOutlets($pagination: Pagination) {
          outlets(pagination: $pagination) {
            paginationMetadata {
              itemsPerPage
              page
              totalItems
              totalPages
            }
            data {
              address
              id
              name
            }
          }
        }
      `,
      variables: {
        pagination: {
          itemsPerPage: itemsPerPage,
          page: page,
        },
      },
    }),
  });
  return payload;
};

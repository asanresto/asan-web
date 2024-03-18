"use server";

import { cookies } from "next/headers";

import { fetchWithReauth } from "@/utils/fetchWithReauth";

export const getProducts = async ({ itemsPerPage, page }: { itemsPerPage: number; page: number }) => {
  const payload = await fetchWithReauth(new URL("api/graphql", process.env.NEXT_PUBLIC_BASE_URL), {
    next: {
      revalidate: 60,
      tags: ["products"],
    },
    headers: {
      Authorization: `Bearer ${cookies().get(process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY)?.value}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      query: `
        query GetProducts($pagination: Pagination, $sorting: ProductSorting) {
          products(pagination: $pagination, sorting: $sorting) {
            paginationMetadata {
              itemsPerPage
              page
              totalItems
              totalPages
            }
            data {
              id
              name
              price
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

export const getProduct = async ({ id }: { id: number }) => {
  const payload = await fetchWithReauth(new URL("api/graphql", process.env.NEXT_PUBLIC_BASE_URL), {
    next: {
      revalidate: 60,
      tags: ["products"],
    },
    headers: {
      Authorization: `Bearer ${cookies().get(process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY)?.value}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      query: `
        query GetProduct($id: Int!) {
          product(id: $id) {
            id
            name
            price
            description
            images {
              id
              url
            }
          }
        }
      `,
      variables: {
        id: id,
      },
    }),
  });
  return payload;
};

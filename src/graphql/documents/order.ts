import { gql } from "urql";

export const getOrdersDoc = gql`
  query GetOrders($pagination: Pagination) {
    orders(pagination: $pagination) {
      data {
        id
        status
        total
      }
      paginationMetadata {
        itemsPerPage
        page
        totalItems
        totalPages
      }
    }
  }
`;

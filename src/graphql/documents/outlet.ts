import { gql } from "urql";

export const getProductsDoc = gql`
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
`;

export const createOutletDoc = gql`
  mutation CreateOutlet($name: String!, $address: String!, $schedule: Schedule!) {
    createOutlet(address: $address, name: $name, schedule: $schedule)
  }
`;

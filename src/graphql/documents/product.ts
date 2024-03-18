import { gql } from "urql";

export const getProductsDoc = gql`
  query Products($limit: Int, $page: Int, $filter: ProductFiltersInput, $sort: String, $search: String) {
    products(filter: $filter, limit: $limit, page: $page, sort: $sort, search: $search) {
      items {
        id
        name
        price
        description
        status
        createdAt
        updatedAt
      }
      page
      limit
      count
    }
  }
`;

// export const getProductDoc = gql`
//   query GetProduct($id: Int!) {
//     product(id: $id) {
//       id
//       name
//       price
//       images {
//         id
//         image
//       }
//     }
//   }
// `;

export const createProductDoc = gql`
  mutation CreateProduct($input: NewProduct!) {
    createProduct(input: $input) {
      id
      name
      price
      description
      status
      createdAt
      updatedAt
    }
  }
`;

// export const updateProductDoc = gql`
//   mutation UpdateProduct(
//     $id: Int!
//     $name: String
//     $price: Float
//     $images: [CroppedFile!]
//     $deleteImages: [Int!]
//     $description: String
//   ) {
//     updateProduct(
//       id: $id
//       name: $name
//       price: $price
//       images: $images
//       deleteImages: $deleteImages
//       description: $description
//     )
//   }
// `;

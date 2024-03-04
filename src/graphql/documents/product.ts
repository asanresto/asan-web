import { gql } from "urql";

// export const getProductsDoc = gql`
//   query GetProducts($pagination: Pagination, $sorting: ProductSorting) {
//     products(pagination: $pagination, sorting: $sorting) {
//       paginationMetadata {
//         itemsPerPage
//         page
//         totalItems
//         totalPages
//       }
//       data {
//         id
//         name
//         price
//       }
//     }
//   }
// `;

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

// export const createProductDoc = gql`
//   mutation CreateProduct($name: String!, $price: Float!, $description: String!, $images: [CroppedFile!]!) {
//     createProduct(name: $name, price: $price, images: $images, description: $description)
//   }
// `;

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

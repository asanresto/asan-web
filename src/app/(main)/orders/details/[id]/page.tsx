import { Box, Button, Grid, InputBase, Stack } from "@mui/material";
import { cookies } from "next/headers";
import NextImage from "next/image";

import BackButton from "@/components/BackButton";
import ProductOverallSaleChart from "@/components/Product/ProductOverallSaleChart";
import ProductStock from "@/components/Product/ProductStock";
// import { getProductDoc } from "@/graphql/documents/product";
// import { GetProductQuery, GetProductQueryVariables } from "@/graphql/types";
import { getServerSideUrql } from "@/urql";

const ProductDetailsPage = async ({ params }: { params: { id: string } }) => {
  return null;
  // const result = await getServerSideUrql().query<GetProductQuery, GetProductQueryVariables>(
  //   getProductDoc,
  //   { id: Number(params.id) },
  //   {
  //     fetchOptions: {
  //       headers: { Authorization: `Bearer ${cookies().get(process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY)?.value}` },
  //     },
  //   },
  // );

  // return (
  //   <Stack spacing={2} alignItems="flex-start">
  //     <BackButton />
  //     <InputBase fullWidth value={result.data?.product?.name} sx={{ fontSize: "32px", fontWeight: 700 }} />
  //     <InputBase value={result.data?.product?.price} />
  //     <Box>Images</Box>
  //     <Box>
  //       <Grid container spacing={2}>
  //         {result.data?.product?.images.map((item, index) => {
  //           return (
  //             <Grid key={index} item xs={12} sm={2}>
  //               <Box position="relative" sx={{ aspectRatio: "1/1" }}>
  //                 <NextImage src={item.image} alt={""} fill />
  //               </Box>
  //               <Button>Delete</Button>
  //             </Grid>
  //           );
  //         })}
  //         <Grid item xs={12}>
  //           <Button variant="outlined">Upload</Button>
  //         </Grid>
  //       </Grid>
  //     </Box>
  //     <Box>Overall Sale</Box>
  //     <ProductOverallSaleChart />
  //     <Box>Stock</Box>
  //     <ProductStock />
  //   </Stack>
  // );
};

export default ProductDetailsPage;

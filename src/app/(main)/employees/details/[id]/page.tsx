import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputBase,
  InputLabel,
  Paper,
  Stack,
  Switch,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { cookies } from "next/headers";
import NextImage from "next/image";

import BackButton from "@/components/BackButton";
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
  //     <Box alignSelf="stretch">
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
  //       </Grid>
  //     </Box>
  //     <Box>Overall Sale</Box>
  //     <Box>Stock</Box>
  //     <Paper sx={{ width: "100%" }}>
  //       <Stack direction="row" alignItems="stretch" spacing={2} p={2}>
  //         <TextField label="Search by outlet name" />
  //         <TextField label="Has more than" />
  //         <TextField label="Has less than" />
  //         <FormControl sx={{ width: "100px" }}>
  //           <InputLabel shrink disableAnimation variant="standard">
  //             Out of stock
  //           </InputLabel>
  //           <Box flex={1} mt="16px" display="flex" alignItems="center">
  //             <Switch size="small" />
  //           </Box>
  //         </FormControl>
  //       </Stack>
  //       <TableContainer>
  //         <Table>
  //           <TableHead>
  //             <TableRow>
  //               <TableCell>Outlet</TableCell>
  //               <TableCell>Stock</TableCell>
  //               <TableCell>Sale</TableCell>
  //               <TableCell>Avg. Rating</TableCell>
  //             </TableRow>
  //           </TableHead>
  //         </Table>
  //       </TableContainer>
  //     </Paper>
  //   </Stack>
  // );
};

export default ProductDetailsPage;

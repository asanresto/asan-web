"use client";

import { Box, Button, Card, CardActions, Grid } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useFieldArray, useFormContext } from "react-hook-form";

import { ProductValues } from "@/models/product/product";
import { useAppDispatch } from "@/store";
import { booleanActions } from "@/store/slices/boolean";

import CroppedImage from "../../CroppedImage";
import ProductImageCropperDialog from "./ProductImageCropperDialog";

const ProductForm = ({ variant = "create" }: { variant?: "create" | "update" }) => {
  return null;
  // const methods = useForm<CreateProductValues>({
  //   resolver: zodResolver(createProductSchema),
  //   defaultValues: { images: [] },
  // });
  // const { handleSubmit } = methods;
  // const [result, createProduct] = useMutation<CreateProductMutation, CreateProductMutationVariables>(createProductDoc);
  // const { enqueueSnackbar } = useSnackbar();

  // return (
  //   <FormProvider {...methods}>
  //     <form
  //       onSubmit={handleSubmit(async (data) => {
  //         const payload = await createProduct({
  //           name: data.name,
  //           price: data.price,
  //           description: data.description ?? "",
  //           images: data.images.map((item) => {
  //             return { file: item.file!, croppedAreaPixels: item.croppedAreaPixels! };
  //           }),
  //         });
  //         if (payload.data) {
  //           enqueueSnackbar({ message: "Created product successfully", variant: "success" });
  //         } else {
  //           enqueueSnackbar({ message: "Failed to create product", variant: "error" });
  //         }
  //       })}
  //     >
  //       <Stack spacing={2}>
  //         <ControlledTextField<CreateProductValues> textField={<TextField required label="Name" />} name="name" />
  //         <ControlledTextField<CreateProductValues> textField={<TextField required label="Price" />} name="price" />
  //         <ControlledTextField<CreateProductValues>
  //           textField={<TextField required label="Description" />}
  //           name="price"
  //         />
  //         <Box>Images</Box>
  //         <Images />
  //         <Stack direction="row" spacing={2} justifyContent="flex-end">
  //           <Button>Cancel</Button>
  //           <Button autoFocus type="submit" variant="contained">
  //             Create
  //           </Button>
  //         </Stack>
  //       </Stack>
  //     </form>
  //     <ProductImageCropperDialog />
  //   </FormProvider>
  // );
};

// const Images = () => {
//   const { setValue } = useFormContext<CreateProductValues>();
//   const { fields, append, remove } = useFieldArray<CreateProductValues>({ name: "images" });
//   const dispatch = useAppDispatch();

//   return (
//     <>
//       <Box>
//         <Grid container spacing={2}>
//           {fields.map((item, index) => {
//             if (!item.url) {
//               return null;
//             }
//             return (
//               <Grid key={item.id} item xs={12} sm={3}>
//                 <Card variant="outlined">
//                   <Box position="relative" overflow="hidden" sx={{ aspectRatio: "1/1" }}>
//                     <CroppedImage url={item.url} croppedArea={item.croppedArea} />
//                   </Box>
//                   <CardActions>
//                     <Button
//                       size="small"
//                       onClick={() => {
//                         remove(index);
//                       }}
//                     >
//                       Remove
//                     </Button>
//                     <Button size="small">Preview</Button>
//                   </CardActions>
//                 </Card>
//               </Grid>
//             );
//           })}
//           {fields.length < 4 && (
//             <Grid item xs={12}>
//               <Button component="label" variant="outlined">
//                 Upload Image
//                 <input
//                   type="file"
//                   onChange={(event) => {
//                     const file = event.target.files?.[0];
//                     if (file) {
//                       dispatch(booleanActions.on(ProductImageCropperDialog.booleanKey));
//                       setValue("addingImage", { file: file, url: URL.createObjectURL(file) });
//                     }
//                   }}
//                   onClick={(event) => {
//                     event.currentTarget.value = "";
//                   }}
//                   style={visuallyHidden}
//                 />
//               </Button>
//             </Grid>
//           )}
//         </Grid>
//       </Box>
//     </>
//   );
// };

export default ProductForm;

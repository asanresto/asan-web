"use client";

const UpdateProductForm = ({ values }: { values?: any }) => {
  return null;
  // const methods = useForm<UpdateProductValues>({
  //   values: values,
  //   resolver: zodResolver(updateProductSchema),
  // });

  // return (
  //   <FormProvider {...methods}>
  //     <Stack component="form" width="100%" spacing={2}>
  //       <Controller<UpdateProductValues>
  //         name="name"
  //         render={({ field: { ref, ...field } }) => {
  //           return <InputBase {...field} fullWidth sx={{ fontSize: "32px", fontWeight: 700 }} />;
  //         }}
  //       />
  //       <Controller<UpdateProductValues>
  //         name="price"
  //         render={({ field: { ref, ...field } }) => {
  //           return <InputBase {...field} />;
  //         }}
  //       />
  //       <Controller<UpdateProductValues>
  //         name="description"
  //         render={({ field: { ref, ...field } }) => {
  //           return <InputBase {...field} placeholder="Description..." />;
  //         }}
  //       />
  //       <Box>Images</Box>
  //       <Box>
  //         <Images />
  //       </Box>
  //       <Box>Overall Sale</Box>
  //       <ProductOverallSaleChart />
  //       <SaveButton />
  //     </Stack>
  //     <ProductImageCropperDialog />
  //   </FormProvider>
  // );
};

// const Images = () => {
//   const dispatch = useAppDispatch();
//   const { getValues, setValue } = useFormContext<UpdateProductValues>();
//   const { fields, append, remove } = useFieldArray<UpdateProductValues>({ name: "images" });

//   return (
//     <Grid container spacing={2}>
//       {fields.map((item, index) => {
//         if (!item.url) {
//           return null;
//         }
//         return (
//           <Grid key={item.id} item xs={12} sm={3}>
//             <Card variant="outlined">
//               <Box position="relative" overflow="hidden" sx={{ aspectRatio: "1/1" }}>
//                 <CroppedImage url={item.url} croppedArea={item.croppedArea} />
//               </Box>
//               <CardActions>
//                 <Button
//                   size="small"
//                   onClick={() => {
//                     remove(index);
//                   }}
//                 >
//                   Remove
//                 </Button>
//                 <Button size="small">Preview</Button>
//               </CardActions>
//             </Card>
//           </Grid>
//         );
//       })}
//       {fields.length < 4 && (
//         <Grid item xs={12}>
//           <Button component="label" variant="outlined">
//             Upload Image
//             <input
//               type="file"
//               onChange={(event) => {
//                 const file = event.target.files?.[0];
//                 if (file) {
//                   dispatch(booleanActions.on(ProductImageCropperDialog.booleanKey));
//                   setValue("addingImage", { file: file, url: URL.createObjectURL(file) });
//                 }
//               }}
//               onClick={(event) => {
//                 event.currentTarget.value = "";
//               }}
//               style={visuallyHidden}
//             />
//           </Button>
//         </Grid>
//       )}
//     </Grid>
//   );
// };

// const SaveButton = () => {
//   const {
//     reset,
//     formState: { dirtyFields },
//     handleSubmit,
//   } = useFormContext();
//   const changes = Object.values(dirtyFields).filter((item) => {
//     if (Array.isArray(item)) {
//       return item.length > 0;
//     }
//     return item === true;
//   }).length;
//   const [result, updateProduct] = useMutation<UpdateProductMutation, UpdateProductMutationVariables>(updateProductDoc);
//   const { enqueueSnackbar } = useSnackbar();

//   if (!changes) {
//     return null;
//   }

//   return (
//     <Stack direction="row" spacing={2} position="fixed" bottom="16px" right="16px">
//       <Fab
//         variant="extended"
//         onClick={() => {
//           reset();
//         }}
//       >
//         Discard All
//       </Fab>
//       <Fab
//         variant="extended"
//         color="primary"
//         onClick={handleSubmit(
//           async (data) => {
//             console.log(data);
//             // const payload = await updateProduct({
//             //   id: data.id,
//             //   name: data.name,
//             //   price: data.price,
//             //   images: data.images.map((item: any) => {
//             //     return { file: item.file!, croppedAreaPixels: item.croppedAreaPixels! };
//             //   }),
//             // });
//             // if (payload.data) {
//             //   enqueueSnackbar({ message: "Updated product successfully", variant: "success" });
//             // } else {
//             //   enqueueSnackbar({ message: "Failed to update product", variant: "error" });
//             // }
//           },
//           (errors) => {
//             console.log(errors);
//           },
//         )}
//       >
//         Save {changes} change{changes > 1 && "s"}
//       </Fab>
//     </Stack>
//   );
// };

export default UpdateProductForm;

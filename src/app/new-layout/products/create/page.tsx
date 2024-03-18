"use client";

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS as DndCss } from "@dnd-kit/utilities";
import { zodResolver } from "@hookform/resolvers/zod";
import { alpha, Box, BoxProps, Button, Dialog, InputLabel, Stack } from "@mui/material";
import { EditorState } from "lexical";
import NextImage from "next/image";
import { useRef, useState } from "react";
import { FormProvider, useForm, useFormContext, useWatch } from "react-hook-form";
import { useMutation } from "urql";

import { CloseIcon } from "@/assets";
import ControlledNumericTextField from "@/components/ControlledNumericTextField";
import ControlledTextField from "@/components/ControlledTextField";
import Header from "@/components/Header";
import ImageCropper from "@/components/ImageCropper";
import NumericTextField from "@/components/NumericTextField";
import RichText from "@/components/RichText";
import Slider2 from "@/components/Slider2";
import TextField2 from "@/components/TextFields2";
import Upload from "@/components/Upload";
import { createProductDoc } from "@/graphql/documents/product";
import { CreateProductMutation, CreateProductMutationVariables } from "@/graphql/types";
import { productSchema, ProductValues } from "@/models/product/product";
import { useAppDispatch, useAppSelector } from "@/store";
import { booleanActions } from "@/store/slices/boolean";
import { themeColors } from "@/theme";
import theme from "@/theme/theme";

import Seo from "./Seo";

const CreateProductPage = () => {
  const descriptionEditorStateRef = useRef<EditorState | null>(null);
  const methods = useForm<ProductValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      images: [],
    },
  });
  const dispatch = useAppDispatch();
  const [createProductResult, createProduct] = useMutation<CreateProductMutation, CreateProductMutationVariables>(
    createProductDoc,
  );

  return (
    <>
      <FormProvider {...methods}>
        <Header
          titleText={<Title />}
          actions={
            <>
              <Button variant="outlined" color="brown" sx={{ borderColor: themeColors.brown[80] }}>
                Save
              </Button>
              <Button
                variant="contained"
                color="brown"
                onClick={methods.handleSubmit(
                  async (data) => {
                    await createProduct({
                      input: {
                        name: data.name,
                        price: data.price,
                        description: data.description,
                        images: data.images.map((item) => {
                          return item.file;
                        }),
                      },
                    });
                  },
                  (errors) => {
                    console.log(errors);
                  },
                )}
              >
                Publish
              </Button>
            </>
          }
        />
        <Stack m={3} mx={6}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            // p={2}
            spacing={1}
            // borderRadius={8}
            // boxShadow="0px 8px 16px rgba(72,52,37,0.05)"
          >
            <Box
              flex={1}
              fontSize="16px"
              fontWeight={700}
              letterSpacing="-0.01em"
              color={alpha(themeColors.brown[80], 0.42)}
            >
              {/* Creating new Product */}
            </Box>
            {/* <Button variant="contained" color="green">
            Save Draft
          </Button> */}
            {/* <Tooltip title="Publish Changes">
            <Button variant="contained" color="green1" sx={{ width: "64px", height: "64px", p: 0 }}>
              <Check width="32px" height="32px" />
            </Button>
          </Tooltip> */}
            {/* <Button variant="contained" color="green1">
            Publish Changes
          </Button> */}
            {/* <Button
            variant="outlined"
            color="orange"
            sx={{ minWidth: 0, width: "56px", p: 0, borderColor: themeColors.orange[40] }}
          >
            <MoreVerticalIcon width="24px" height="24px" />
          </Button> */}
          </Stack>
          <Stack spacing={4}>
            <ControlledTextField<ProductValues>
              textField={<TextField2 label="Name" variant="filled" required placeholder="Enter product name" />}
              name="name"
            />
            <ControlledNumericTextField<ProductValues>
              numericTextField={
                <NumericTextField
                  prefix="$"
                  label="Price"
                  variant="filled"
                  required
                  placeholder="Enter product price"
                />
              }
              name="price"
            />
            <RichText
              label="Description"
              placeholder="Enter product description"
              editorStateRef={descriptionEditorStateRef}
            />
            <Box>
              <InputLabel
                sx={{ fontSize: "14px", fontWeight: 800, mb: "8px", lineHeight: "16px", color: themeColors.brown[80] }}
              >
                Images
              </InputLabel>
              <Box display="flex" gap={1}>
                <Images />
                <Upload
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      dispatch(booleanActions.on(ProductImageCropperDialog.booleanKey));
                      methods.setValue("addingImage", { file: file, url: URL.createObjectURL(file) });
                    }
                  }}
                />
              </Box>
            </Box>
          </Stack>
        </Stack>
        <ProductImageCropperDialog />
      </FormProvider>
      <Seo />
    </>
  );
};

const ProductImageCropperDialog = () => {
  const { setValue, getValues } = useFormContext<ProductValues>();
  const open = useAppSelector((state) => {
    return state.boolean[ProductImageCropperDialog.booleanKey] ?? false;
  });
  const dispatch = useAppDispatch();

  return (
    <Dialog
      open={open}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "40px",
          boxShadow: "none",
        },
      }}
      onClose={() => {
        dispatch(booleanActions.off(ProductImageCropperDialog.booleanKey));
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" p={3}>
        <Box fontSize="24px" fontWeight={800} lineHeight="32px" letterSpacing="-0.02em" color={themeColors.brown[80]}>
          Crop Image
        </Box>
        <Button variant="contained" color="brown" sx={{ minWidth: "36px", minHeight: "36px", p: 0 }}>
          <CloseIcon />
        </Button>
      </Stack>
      <Stack px={3} pb={3} spacing={3}>
        <ProductImageCropper />
        <Button
          variant="contained"
          color="brown"
          sx={{ display: "flex", mx: "auto" }}
          onClick={() => {
            dispatch(booleanActions.off(ProductImageCropperDialog.booleanKey));
            try {
              setValue("images", [...getValues("images"), getValues("addingImage")!]);
            } catch (error) {}
          }}
        >
          Done
        </Button>
      </Stack>
    </Dialog>
  );
};

ProductImageCropperDialog.booleanKey = "productImageCropperDialog";

const ProductImageCropper = () => {
  const [zoom, setZoom] = useState(1);
  // const { setValue } = useFormContext<ProductValues>();
  const addingImageUrl = useWatch<ProductValues, "addingImage.url">({ name: "addingImage.url", exact: true });

  return (
    <Stack spacing={2}>
      <Box position="relative" height="384px" mx="auto" sx={{ aspectRatio: "1/1" }}>
        <ImageCropper
          image={addingImageUrl}
          aspect={1 / 1}
          zoom={zoom}
          onZoomChange={setZoom}
          onCropComplete={(croppedArea, croppedAreaPixels) => {
            // setValue("addingImage.croppedArea", croppedArea);
            // setValue("addingImage.croppedAreaPixels", croppedAreaPixels);
          }}
        />
      </Box>
      <Slider2
        min={1}
        max={4}
        value={zoom}
        marks={[
          { value: 1, label: "1x" },
          { value: 4, label: "4x" },
        ]}
        onChange={(_, value) => {
          setZoom(value as number);
        }}
      />
    </Stack>
  );
};

const Images = () => {
  const images = useWatch<ProductValues, "images">({ name: "images" });
  const [items, setItems] = useState<{ id: any }[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  if (!images.length) {
    return null;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={({ active, over }) => {
        if (!over) {
          return;
        }
        if (active.id !== over.id) {
          setItems((items) => {
            const oldIndex = items.findIndex((item) => {
              return item.id === active.id;
            });
            const newIndex = items.findIndex((item) => {
              return item.id === over.id;
            });
            const newItems = arrayMove(items, oldIndex, newIndex);

            return newItems;
          });
        }
      }}
    >
      <SortableContext items={items} strategy={horizontalListSortingStrategy}>
        <Stack direction="row" gap={1} flexWrap="wrap">
          {images.map(({ url }) => {
            return <UploadedImage key={url} uniqueId={url} imageUrl={url} />;
          })}
        </Stack>
      </SortableContext>
    </DndContext>
  );
};

const UploadedImage = ({
  children,
  uniqueId,
  imageUrl,
  ...props
}: { uniqueId: UniqueIdentifier; imageUrl: string } & BoxProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: uniqueId });

  return (
    <Box
      ref={setNodeRef}
      position="relative"
      width="220px"
      height="220px"
      borderRadius={7}
      overflow="hidden"
      bgcolor={themeColors.brown[10]}
      sx={{
        transform: DndCss.Translate.toString(transform),
        transition: transition,
        cursor: isDragging ? "grabbing" : "grab",
        boxShadow: isDragging ? `${alpha(themeColors.brown[80], 0.2)} 0 0 0 4px}` : undefined,
      }}
      {...attributes}
      {...listeners}
      {...props}
    >
      <NextImage fill src={imageUrl} alt="" style={{ objectFit: "cover" }} />
      <Box
        position="absolute"
        top={0}
        right={0}
        bottom={0}
        left={0}
        border={`1px solid transparent`}
        borderRadius={7}
        display="grid"
        sx={{
          placeItems: "center",
          transition: theme.transitions.create(["border", "box-shadow"], {
            duration: theme.transitions.duration.standard,
            easing: theme.transitions.easing.easeInOut,
          }),
          "&:hover": {
            borderColor: isDragging ? themeColors.brown[80] : themeColors.brown[40],
          },
        }}
      >
        {/* <Box>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="brown"
                size="small"
                sx={{
                  fontSize: "12px",
                  fontWeight: 700,
                  lineHeight: "16px",
                  letterSpacing: "-0.02em",
                  minWidth: 0,
                  minHeight: 0,
                  px: "12px",
                  py: "8px",
                  borderRadius: "16px",
                }}
              >
                Remove
              </Button>
            </Grid>
            <Grid item xs={6}>
              <div>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ minWidth: 0, minHeight: 0, p: 0, width: "32px", height: "32px" }}
                >
                  <PlusIcon width="16px" height="16px" />
                </Button>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ minWidth: 0, minHeight: 0, p: 0, width: "32px", height: "32px" }}
                >
                  <PlusIcon width="16px" height="16px" />
                </Button>
              </div>
            </Grid>
          </Grid>
        </Box> */}
      </Box>
    </Box>
  );
};

const Title = () => {
  const title = useWatch<ProductValues>({ name: "name" });

  return <>{title || "[Untitled]"}</>;
};

export default CreateProductPage;

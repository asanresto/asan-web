"use server";

import BackButton from "@/components/BackButton";
import { getProductDoc } from "@/graphql/documents/product";
import { GetProductQuery, GetProductQueryVariables } from "@/graphql/types";
import { getServerSideUrql } from "@/urql";
import { Box, Button, Grid, InputBase, Stack } from "@mui/material";
import { cookies } from "next/headers";
import NextImage from "next/image";

const OutletDetailsPage = async ({ params }: { params: { id: string } }) => {};

export default OutletDetailsPage;

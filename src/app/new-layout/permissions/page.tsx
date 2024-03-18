"use client";

import {
  Accordion,
  AccordionProps,
  AccordionSummary,
  accordionSummaryClasses,
  Box,
  FormControlLabel,
  Grid,
  Stack,
} from "@mui/material";
import { ReactNode } from "react";

import { ChevronDownIcon } from "@/assets";
import CustomCheckbox from "@/components/CustomCheckbox";
import Header from "@/components/Header";
import { themeColors } from "@/theme";
import { themeTypography } from "@/theme/typography";

const PerimssionsPage = () => {
  return (
    <>
      <Header titleText="Permissions" />
      <Stack mx={6} spacing="16px" mt={3}>
        <PermissionAccordion summary="Product">
          <Grid container spacing={3}>
            {[1, 2, 3, 4].map((item) => {
              return (
                <Grid key={item} item xs>
                  <FormControlLabel
                    control={<CustomCheckbox variant="contained" />}
                    label={
                      <Box {...themeTypography.textSm} fontWeight={600} color={themeColors.brown[80]} ml={1}>
                        Create
                      </Box>
                    }
                    sx={{
                      ml: 0,
                      mr: 0,
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </PermissionAccordion>
        <PermissionAccordion summary="Order">
          <FormControlLabel
            control={<CustomCheckbox variant="contained" />}
            label={
              <Box {...themeTypography.textSm} fontWeight={600} color={themeColors.brown[80]} ml={1}>
                Create123
              </Box>
            }
            sx={{
              ml: 0,
              mr: 0,
            }}
          />
        </PermissionAccordion>
      </Stack>
    </>
  );
};

const PermissionAccordion = ({ children, summary, ...props }: { summary?: ReactNode } & AccordionProps) => {
  return (
    <Accordion
      {...props}
      sx={{
        backgroundColor: themeColors.brown[10],
        borderRadius: "32px !important",
        "&::before": {
          display: "none",
        },
      }}
    >
      <AccordionSummary
        expandIcon={
          <Box p="6px" bgcolor={themeColors.brown[80]} color="white" borderRadius="9999px">
            <ChevronDownIcon width="24px" height="24px" style={{ display: "block" }} />
          </Box>
        }
        sx={{
          fontSize: "24px",
          fontWeight: 800,
          lineHeight: "initial",
          letterSpacing: "-0.01em",
          color: themeColors.brown[80],
          minHeight: "84px",
          padding: "0 24px",
          [`.${accordionSummaryClasses.content}`]: {
            margin: "24px 0",
          },
        }}
      >
        {summary}
      </AccordionSummary>
      <Box px={3} pb={3}>
        {children}
      </Box>
    </Accordion>
  );
};

export default PerimssionsPage;

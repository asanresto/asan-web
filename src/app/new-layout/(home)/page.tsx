"use client";

import { faker } from "@faker-js/faker";
import { CartesianChart, HorizontalAxis, Line, VerticalAxis } from "@khuongtp/react-d3-charts";
import { Box, Stack } from "@mui/material";

import Header from "@/components/Header";
import { themeColors } from "@/theme";
import { urbanist } from "@/theme/theme";

const data = Array(12)
  .fill(undefined)
  .map((_, index) => {
    return {
      value1: faker.number.int({ min: -100, max: 100 }),
      value2: faker.number.int({ min: -100, max: 100 }),
      value3: faker.number.int({ min: 0, max: 100 }),
      value4: faker.number.int({ min: 0, max: 100 }),
      x: String(1999 + index),
    };
  });

const HomePage = () => {
  return (
    <>
      <Header titleText="Dashboard" borderColor="transparent" />
      <Box mx={6}>
        <Box
          bgcolor="#F5F5F5"
          p="24px"
          borderRadius="32px"
          sx={{
            "svg text": {
              fontFamily: urbanist.style.fontFamily,
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "initial",
              letterSpacing: "-0.02em",
              color: "#ACA9A5",
            },
            ".vertical-axis.left": {
              ".domain, line": {
                stroke: "transparent",
              },
            },
            ".y-axis-grid-lines line": {
              strokeDasharray: 8,
              stroke: "#C9C7C5",
            },
            ".horizontal-axis.bottom": {
              ".domain, line": {
                stroke: "transparent",
              },
            },
            // "#value4": {
            //   fill: "red",
            // },
          }}
        >
          <Stack spacing={3}>
            <Box
              fontSize="24px"
              fontWeight={800}
              lineHeight="32px"
              letterSpacing="-0.02em"
              color={themeColors.brown[80]}
            >
              Sales
            </Box>

            <CartesianChart width="100%" height="480px" data={data} scaleExtent={[1, Infinity]}>
              <HorizontalAxis dataKey="x" axisId="xAxis0" tickLabelWidth={40} paddingInner={1} paddingOuter={0} />
              <VerticalAxis
                tickSize={8}
                tickCount={7}
                tickFormatter={(domainValue) => {
                  return Intl.NumberFormat(undefined, {
                    notation: "compact",
                  }).format(domainValue as number);
                }}
                axisId="yAxisLeft"
                orientation="left"
                gridLines
              />
              {/* <VerticalAxis
          orientation="right"
          axisId="yAxisRight"
          tickSize={8}
          tickCount={7}
          // endDomainModifier={(endDomain) => {
          //   return endDomain + 1.5;
          // }}
        /> */}
              {/* <Bar
              dataKey="value1"
              // render={(props) => {
              //   return <rect fill="red" {...props} />;
              // }}
              stackId="a"
              yAxisId="yAxisLeft"
            />
            <Bar dataKey="value2" fill="green" stackId="a" yAxisId="yAxisLeft" />
            <Bar dataKey="value3" fill="blue" yAxisId="yAxisLeft" />*/}
              <Line
                curve="bumpX"
                id="value4"
                dataKey="value4"
                stroke="#4F3422"
                strokeWidth={4}
                yAxisId="yAxisLeft"
                xAxisId="xAxis0"
              />
              {/* <CartesianChartTooltip render={<TooltipContent />} /> */}
            </CartesianChart>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;

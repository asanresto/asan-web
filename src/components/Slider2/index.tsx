import { alpha, Slider, sliderClasses, SliderProps } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import { themeColors } from "@/theme";

const Slider2 = ({ min, max, step, value, marks, onChange, onChangeCommitted, ...props }: SliderProps) => {
  const sliderRef = useRef<HTMLSpanElement | null>(null);
  const [sliderWidth, setSliderWidth] = useState<number>(1);

  // useEffect(() => {
  //   const t = () => {
  //     if (sliderRef.current?.offsetWidth !== undefined) {
  //       setSliderWidth(sliderRef.current?.offsetWidth);
  //     }
  //   };
  //   window.addEventListener("resize", t);
  //   return () => {
  //     window.removeEventListener("resize", t);
  //   };
  // }, []);

  useEffect(() => {
    if (sliderRef.current?.offsetWidth) {
      setSliderWidth(sliderRef.current?.offsetWidth);
    }
  }, []);

  return (
    <Slider
      min={0}
      max={sliderWidth}
      step={1}
      ref={sliderRef}
      onChange={(event, value, activeThumb) => {
        if (typeof value === "number") {
          // setZoom(Math.round((value / sliderWidth) * 100));
          onChange?.(event, (min ?? 0) + ((max ?? 100) - (min ?? 0)) * (value / sliderWidth), activeThumb);
        } else {
          onChange?.(event, value, activeThumb);
        }
      }}
      value={typeof value === "number" ? ((value - (min ?? 0)) / ((max ?? 100) - (min ?? 0))) * sliderWidth : value}
      marks={
        typeof marks === "boolean"
          ? marks
          : marks?.map((item) => {
              return { ...item, value: sliderWidth * ((item.value - (min ?? 0)) / ((max ?? 100) - (min ?? 0))) };
            })
      }
      sx={{
        height: "8px",
        [`.${sliderClasses.thumb}`]: {
          backgroundColor: themeColors.green[50],
        },
        [`.${sliderClasses.track}`]: {
          backgroundColor: themeColors.green[50],
          border: "none",
        },
        [`.${sliderClasses.rail}`]: {
          backgroundColor: themeColors.grey[10],
          opacity: 1,
        },
        [`.${sliderClasses.mark}`]: {
          display: "none",
        },
        [`.${sliderClasses.markLabel}`]: {
          fontSize: "16px",
          fontWeight: 700,
          color: alpha(themeColors.grey[100], 0.64),
        },
      }}
      {...props}
    />
  );
};

export default Slider2;

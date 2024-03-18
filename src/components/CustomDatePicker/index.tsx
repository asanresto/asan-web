import { Box, BoxProps, Button, ButtonProps, inputAdornmentClasses, Stack } from "@mui/material";
import {
  dateCalendarClasses,
  DatePicker,
  DatePickerProps,
  dayCalendarClasses,
  monthCalendarClasses,
  PickersCalendarHeaderProps,
  pickersDayClasses,
  pickersMonthClasses,
  pickersYearClasses,
  PickerValidDate,
  yearCalendarClasses,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";

import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "@/assets";
import { themeColors } from "@/theme";

import CustomTextField from "../CustomTextField";

const CustomDatePicker = <TDate extends PickerValidDate>({ slots, slotProps, ...props }: DatePickerProps<TDate>) => {
  return (
    <DatePicker
      showDaysOutsideCurrentMonth
      views={["year", "month", "day"]}
      slots={{
        // @ts-expect-error
        calendarHeader: CustomCalendarHeader,
        textField: CustomTextField,
        openPickerIcon: CalendarIcon,
      }}
      slotProps={{
        desktopPaper: {
          sx: { borderRadius: "20px", padding: "4px", boxShadow: "0px 8px 16px rgba(72,52,37,0.05)" },
        },
        layout: {
          sx: {
            [`.${dateCalendarClasses.root}`]: {
              width: `${48 * 7}px`,
              height: `${56 + 48 * 7}px`,
              // height: "unset",
              maxHeight: "unset",
            },
            [`.${dayCalendarClasses.weekContainer}`]: {
              margin: 0,
            },
            [`.${dayCalendarClasses.slideTransition}`]: {
              minHeight: `${48 * 6}px`,
            },
            [`.${dayCalendarClasses.weekDayLabel}`]: {
              fontSize: "16px",
              fontWeight: 700,
              color: themeColors.orange[40],
              margin: 0,
              width: "48px",
              height: "48px",
            },
            [`.${pickersDayClasses.root}`]: {
              margin: 0,
              width: "48px",
              height: "48px",
              fontSize: "16px",
              fontWeight: 700,
              color: themeColors.brown[80],
              [`&.${pickersDayClasses.selected}`]: {
                bgcolor: `${themeColors.green[50]} !important`,
                color: "white !important",
                fontWeight: 700,
              },
              [`&.${pickersDayClasses.today}`]: {
                border: "none",
                bgcolor: themeColors.orange[40],
                color: "white",
              },
              [`&.${pickersDayClasses.dayOutsideMonth}`]: {
                color: themeColors.brown[30],
              },
            },
            [`.${monthCalendarClasses.root}`]: {
              width: "100%",
            },
            [`.${yearCalendarClasses.root}`]: {
              width: "100%",
            },
            [`.${pickersYearClasses.yearButton}`]: {
              fontSize: "16px",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              height: "48px",
              borderRadius: "24px",
              color: themeColors.brown[80],
              [`&.${pickersMonthClasses.selected}`]: {
                color: "white",
              },
            },
            [`.${pickersMonthClasses.monthButton}`]: {
              fontSize: "16px",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              height: "48px",
              borderRadius: "24px",
              color: themeColors.brown[80],
              [`&.${pickersMonthClasses.selected}`]: {
                color: "white",
              },
            },
          },
        },
        openPickerIcon: {
          width: "20px",
          height: "20px",
          // color: themeColors.brown[80],
        },
        openPickerButton: {
          sx: {
            p: "2px",
            color: themeColors.brown[80],
          },
        },
        textField: {
          inputProps: {
            sx: {
              pr: 0,
            },
          },
          InputProps: {
            sx: {
              pr: "16px",
              [`.${inputAdornmentClasses.root}`]: {
                ml: "4px",
              },
            },
          },
        },
      }}
      {...props}
    />
  );
};

const CustomCalendarHeader = (props: PickersCalendarHeaderProps<PickerValidDate>) => {
  console.log(props);
  const current = dayjs(props.currentMonth);

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
      <NavigationButton
        Icon={ChevronLeftIcon}
        onClick={() => {
          props.onMonthChange(props.currentMonth.subtract(1, "month"), "right");
        }}
      />
      <Stack direction="row" spacing={1}>
        <HeaderButton
          onClick={() => {
            props.onViewChange?.("month");
          }}
        >
          {current.format("MMMM")}
        </HeaderButton>
        <HeaderButton
          onClick={() => {
            props.onViewChange?.("year");
          }}
        >
          {current.format("YYYY")}
        </HeaderButton>
      </Stack>
      <NavigationButton
        Icon={ChevronRightIcon}
        onClick={() => {
          props.onMonthChange(props.currentMonth.add(1, "month"), "left");
        }}
      />
    </Stack>
  );
};

const HeaderButton = ({ children, ...props }: BoxProps) => {
  return (
    <Box
      fontSize="20px"
      fontWeight={800}
      letterSpacing="-0.01em"
      color={themeColors.brown[80]}
      sx={{ cursor: "pointer" }}
      {...props}
    >
      {children}
    </Box>
  );
};

const NavigationButton = ({ Icon, ...props }: { Icon: any } & ButtonProps) => {
  return (
    <Button
      variant="text"
      color="brown60"
      sx={{
        minWidth: 0,
        minHeight: 0,
        width: "40px",
        height: "40px",
        p: 0,
        borderRadius: "20px",
      }}
      {...props}
    >
      <Icon width="24px" height="24px" />
    </Button>
  );
};

export default CustomDatePicker;

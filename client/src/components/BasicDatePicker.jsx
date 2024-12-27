import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export function BasicDatePicker({ onSelectDate }) {
  const handleDateChange = (dayjsDate) => {
    if (dayjsDate) {
      const formattedDate = new Date(dayjsDate.toDate()).toString();
      onSelectDate(formattedDate);
    } else {
      onSelectDate(null); // Handle null or invalid date case
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="Select Date"
          inputVariant="outlined"
          className="w-full mt-2 bg-white rounded-md hidden lg:block"
          style={{ width: "100%" }}
          onChange={handleDateChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export function MobileDatePicker({ onSelectDate }) {
  const handleDateChange = (dayjsDate) => {
    if (dayjsDate) {
      const formattedDate = new Date(dayjsDate.toDate()).toString();
      onSelectDate(formattedDate);
    } else {
      onSelectDate(null); // Handle null or invalid date case
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="Select Date"
          inputVariant="outlined"
          className="w-full mt-2 bg-white rounded-md hidden lg:block"
          style={{ width: "100%" }}
          onChange={handleDateChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

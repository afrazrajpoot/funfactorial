import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export  function BasicDatePicker({ onSelectDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="Select Date"
          inputVariant="outlined"
          className="w-full mt-2 bg-white rounded-md hidden lg:block"
          style={{ width: '100%' }}
          onChange={(date) => onSelectDate(date)}
          // You can add more custom styles here
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}



export  function MobileDatePicker({ onSelectDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="Select Date"
          inputVariant="outlined"
          className="w-full mt-2 bg-white rounded-md hidden lg:block"
          style={{ width: '100%' }}
          onChange={(date) => onSelectDate(date)}
          // You can add more custom styles here
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

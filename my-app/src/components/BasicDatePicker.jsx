import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function BasicDatePicker({ onSelectDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="Basic date picker"
          inputVariant="outlined"
          className="w-full mt-2"
          style={{ maxWidth: 300 }}
          onChange={(date) => onSelectDate(date)}
          // You can add more custom styles here
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

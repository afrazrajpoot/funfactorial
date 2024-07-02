import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export default function BasicTimePicker({ onSelectTime }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimePicker"]}>
        <TimePicker
          label="Basic time picker"
          className="w-full mt-2"
          inputVariant="outlined"
          style={{ maxWidth: 300 }}
          onChange={(time) => onSelectTime(time)}
          // Add more custom styles as needed
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

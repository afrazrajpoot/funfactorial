import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { toast } from "sonner";
import { useCreateBookingMutation } from "../store/storeApi";
import BasicTimePicker from "../components/BasicTimePicker";
import BasicDatePicker from "../components/BasicDatePicker";
import { bookingFormData } from "../data";

const BookingForm = () => {
  const [createBooking, { isLoading, error, isSuccess }] =
    useCreateBookingMutation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // State for selected date and time
  const [selectedDateTime, setSelectedDateTime] = useState({
    date: null,
    time: null,
  });

  const onSubmit = async (data) => {
    // Validate if selected date and time are in the past
    const currentDate = new Date();
    if (
      !selectedDateTime.date || // Check if date is not selected
      selectedDateTime.date < currentDate ||
      (selectedDateTime.time === currentDate.getTime() &&
        selectedDateTime.time < currentDate)
    ) {
      toast.error("Please select a valid date and time", {
        position: "top-center",
      });
      return;
    }

    try {
      // Convert Date objects to local time strings
      const localDate = selectedDateTime.date.toLocaleString();
      const localTime = selectedDateTime.time.toLocaleString();

      // Perform API call to create booking
      const response = await createBooking({
        ...data,
        date: localDate,
        time: localTime,
        available: false,
      });

      // Optionally, clear form fields or show success message
    } catch (error) {
      toast.error("Failed to create booking", {
        position: "top-center",
      });
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error.data.message, {
        position: "top-center",
      });
    }
    if (isSuccess) {
      toast.success("Booking created successfully", {
        position: "top-center",
      });
    }
  }, [isSuccess, error]);
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Booking Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* BasicTimePicker Component */}
        <BasicTimePicker
          onSelectTime={(time) =>
            setSelectedDateTime((prev) => ({ ...prev, time }))
          }
        />

        {/* BasicDatePicker Component */}
        <BasicDatePicker
          onSelectDate={(date) =>
            setSelectedDateTime((prev) => ({ ...prev, date }))
          }
        />

        {/* Form Fields */}
        {bookingFormData.map((field, index) => (
          <div key={index} className="mb-4">
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700"
            >
              {field.label}
            </label>
            <Controller
              name={field.name}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type={field.name === "email" ? "email" : "text"}
                  id={field.name}
                  placeholder={field?.placeholder}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message}
                  variant="outlined"
                  fullWidth
                  className="mt-1"
                />
              )}
              rules={{
                required: { value: true, message: "This field is required" },
                // Add other validation rules as necessary
              }}
            />
          </div>
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;

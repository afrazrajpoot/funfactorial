'use client'
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "sonner";
import CryptoJS from "crypto-js";
import { TextField, Button, Grid, Paper, Typography, Box } from "@mui/material";
import DatePicker from "react-datepicker";  // Import react-datepicker
import "react-datepicker/dist/react-datepicker.css";  // Import styles for the date picker
import { addDays, isBefore, startOfDay } from "date-fns";  // You can keep using date-fns
import { contactData, contactFormData } from "@/app/data";
import { useGlobalState } from "@/context/globalState";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamically import Header component with no SSR
const Header = dynamic(() => import("@/components/Header"), { ssr: false });
const getCurrentYearMonth = () => {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: String(now.getMonth() + 1).padStart(2, "0"),
  };
};

const Contact = () => {
  const { year, month } = getCurrentYearMonth();
  const [isLoading, setLoading] = useState(false);
  const [decryptedData, setDecryptedData] = useState({});
  const { itemDetail, setItemDetail } = useGlobalState();
  const stripe = useStripe();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      startDate: `${year}-${month}-01`,
      endDate: `${year}-${month}-31`,
      postalCode: "",
    },
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  // Validation functions using date-fns
  const validateStartDate = (date) => {
    const minDate = addDays(startOfDay(new Date()), 3);
    if (isBefore(new Date(date), minDate)) {
      return "Start date must be at least 3 days from today";
    }
    return true;
  };

  const validateEndDate = (date) => {
    if (!startDate) return "Please select a start date first";
    if (isBefore(new Date(date), new Date(startDate))) {
      return "End date must be after start date";
    }
    return true;
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setLoading(true);
      clearErrors();

      // Validate dates
      const startDateValidation = validateStartDate(data.startDate);
      if (startDateValidation !== true) {
        setError("startDate", { type: "manual", message: startDateValidation });
        return;
      }

      const endDateValidation = validateEndDate(data.endDate);
      if (endDateValidation !== true) {
        setError("endDate", { type: "manual", message: endDateValidation });
        return;
      }

      if (typeof window !== 'undefined') {
        // Store booking data
        localStorage.setItem(
          "bookingData",
          JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            startDate: data.startDate,
            endDate: data.endDate,
            itemDetail,
          })
        );
      }

      // Stripe logic, commented out for now
      const amount = decryptedData.price;
      const {
        data: { sessionId },
      } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payment-sheet`, {
        amount: amount + 125,
        currency: "gbp",
        img:
          itemDetail?.image.length < 6
            ? `${process.env.NEXT_PUBLIC_API_URL}/images/${itemDetail?.image}`
            : `https://bouncycastlenetwork-res.cloudinary.com/image/upload/f_auto,q_auto,c_limit,w_700/${itemDetail?.image}`,
      });

      const paymentResponse = await stripe.redirectToCheckout({ sessionId });

      if (paymentResponse.error) {
        throw new Error(paymentResponse.error.message);
      }

    } catch (error) {
      console.log(error, 'error');
      let errorMessage = "An error occurred during submission.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage, { position: "top-center" });
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;

  const decryptAndGetFromLocalStorage = (key) => {
    try {
      if (typeof window !== 'undefined') {
        const encryptedData = localStorage.getItem(key);
        if (!encryptedData) return null;

        const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedData);
      }
    } catch (error) {
      toast.error("Error loading saved data");
      return null;
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const decryptedData = decryptAndGetFromLocalStorage("data");
      setItemDetail(decryptedData);
      setDecryptedData(decryptedData);
    }
  }, [setItemDetail]);

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          p: 4,
          gap: 8,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h2" color="#40327a" textAlign={{ xs: "center", lg: "left" }} mb={4}>
            Contact Form
          </Typography>
          <Box component="ul" sx={{ listStyleType: "disc", pl: 4, mb: 3 }}>
            { contactData && contactData.length > 0 && contactData.map((elem, ind) => (
              <Box component="li" key={ind} mb={1}>
                <Typography component="span" fontWeight="bold">
                  {elem.title}
                </Typography>{" "}
                <Typography component="span" color={ind === 0 ? "text.primary" : "primary"}>
                  <Link href={`${elem?.link}`} target="_blank">
                    {elem.info}
                  </Link>
                </Typography>
              </Box>
            ))}
          </Box>
          <Typography variant="body1" mb={1}>
            We operate 7 days a week, 365 days a year.
          </Typography>
          <Paper elevation={3} sx={{ p: 4 }} className="w-full lg:max-w-[60vw] lg:ml-[37vw] lg:mt-[-17vw]">
            <Typography variant="h4" color="#40327a" textAlign="center" mb={4} fontWeight={600}>
              Quick Enquiry Form
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Grid container spacing={3}>
                {contactData && contactFormData
                  .filter((elem) => !["startDate", "endDate"].includes(elem.name))
                  .map((elem, ind) => (
                    <Grid item xs={12} key={ind}>
                      <Controller
                        name={elem.name}
                        control={control}
                        rules={elem.rules}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            multiline={elem.type === "textarea"}
                            rows={elem.type === "textarea" ? 5 : undefined}
                            type={elem.type}
                            label={elem.label}
                            placeholder={elem.placeHolder}
                            error={!!errors[elem.name]}
                            helperText={errors[elem.name]?.message}
                          />
                        )}
                      />
                    </Grid>
                  ))}
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Controller
                      name="startDate"
                      control={control}
                      rules={{
                        required: "Start date is required",
                        validate: validateStartDate,
                      }}
                      render={({ field }) => (
                        <DatePicker
                          {...field} {...control}
                          selected={field.value ? new Date(field.value) : null}  // Handle date selection properly
                          onChange={(date) => field.onChange(date)} // Bind the date picker change event
                          dateFormat="dd/MM/yyyy"
                          label="Start Date"
                          className="form-control border-[0.2vw] rounded-[0.5vw] p-[0.5vw]"
                          placeholderText="Select a start date"
                        />
                      )}
                    />
                    <Controller
                      name="endDate"
                      control={control}
                      rules={{
                        required: "End date is required",
                        validate: validateEndDate,
                      }}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          selected={field.value ? new Date(field.value) : null}
                          onChange={(date) => field.onChange(date)}
                          dateFormat="dd/MM/yyyy"
                          label="End Date"
                          minDate={startDate ? new Date(startDate) : undefined}
                          className="form-control border-[0.2vw] rounded-[0.5vw] p-[0.5vw]"
                          placeholderText="Select an end date"
                        />
                      )}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
                <Button
                  className="bg-gradient-to-r from-[#40327a] to-purple-600 text-white"
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={isSubmitting || isLoading}
                >
                  {isSubmitting || isLoading ? "Processing..." : "Send Enquiry"}
                </Button>
              </Box>
            </form>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default Contact;

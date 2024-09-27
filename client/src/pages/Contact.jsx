import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "sonner";
import CryptoJS from "crypto-js";
import { TextField, Button, Grid, Paper, Typography, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Ribbons from "../components/Ribbons";
import { contactData, contactFormData } from "../data";
import { useGlobalState } from "../context/globalState";

const getCurrentYearMonth = () => {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: String(now.getMonth() + 1).padStart(2, "0"),
  };
};

const Contact = () => {
  const postCodes = [
    "BD11",
    "HD8",
    "LS1",
    "LS2",
    "LS3",
    "LS4",
    "LS5",
    "LS6",
    "LS7",
    "LS8",
    "LS9",
    "LS10",
    "LS11",
    "LS12",
    "LS13",
    "LS14",
    "LS15",
    "LS16",
    "LS17",
    "LS18",
    "LS19",
    "LS20",
    "WF1",
    "WF2",
    "WF3",
    "WF4",
    "WF5",
    "WF6",
    "WF7",
    "WF8",
    "WF9",
    "WF10",
  ];
  const { year, month } = getCurrentYearMonth();
  const [isLoading, setLoading] = useState(false);
  const [decryptedData, setDecryptedData] = useState({});
  const [payment, setPAyment] = useState({});
  const { itemDetail, setItemDetail } = useGlobalState();
  // const [booking, { isLoading, isError, error, isSuccess, data: responseData }] = useCreateBookingMutation();
  const stripe = useStripe();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDate: `${year}-${month}-01`,
      endDate: `${year}-${month}-31`,
      postalCode: "",
    },
  });

  const startDate = watch("startDate");
  // const endDate = watch("endDate");
  // const currentDate = new Date()
  const onSubmit = async (data) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to 00:00:00 for comparison
  
    // Validate startDate
    if (new Date(data.startDate) <= today) {
      toast.error("Please select valid date.", {
        position: "top-center",
      });
      return; // Prevent submission
    }
  
    // Validate endDate and startDate relationship
    if (new Date(data.startDate) >= new Date(data.endDate)) {
      toast.error("Start date cannot be after or equal to the end date.", {
        position: "top-center",
      });
      return; // Prevent submission
    }
  
    // Postal code validation
    const isValidPostalCode = postCodes.some(
      (code) => code === data.postalCode
    );
    
    if (!isValidPostalCode) {
      toast.error(`Invalid delivery area: ${data.postalCode}`, {
        position: "top-center",
      });
      return; // Prevent submission
    }
  
    try {
      setLoading(true);
      
      // Store form data in localStorage
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
  
      // Check if Stripe is loaded
      if (!stripe) {
        toast.error("Stripe is not loaded. Please try again later.");
        return;
      }
  
      const amount = parseInt(decryptedData); // Assuming amount is in cents
  
      // Payment processing
      const {
        data: { sessionId },
      } = await axios.post("https://api.funrides.co.uk/payment-sheet", {
        amount,
        currency: "gbp",
        img: `https://www.funrides.co.uk/${itemDetail.image}`,
      });
  
      const paymentResponse = await stripe.redirectToCheckout({ sessionId });
      setPayment(paymentResponse);
  
      if (paymentResponse.error) {
        toast.error(`Payment error: ${paymentResponse.error.message}`);
        return;
      }
    } catch (err) {
      toast.error(`Submission error: ${err.message}`);
      console.error("Error during submission:", err.response?.data || err.message);
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };
  
  

  const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

  const decryptAndGetFromLocalStorage = (key) => {
    const encryptedData = localStorage.getItem(key);
    if (encryptedData) {
      const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedData);
    }
    return null;
  };

  useEffect(() => {
    const decryptedData = decryptAndGetFromLocalStorage("data");
    setItemDetail(decryptedData);
    setDecryptedData(decryptedData?.price.slice(0, 3));
    // console.log(payment, "payment");
  }, [setItemDetail]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          p: 4,
          gap: 8,
        }}
      >
        <Box
          sx={{ display: { xs: "none", lg: "block" }, width: { lg: "25%" } }}
        >
          <Ribbons />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h2"
            color="primary"
            textAlign={{ xs: "center", lg: "left" }}
            mb={4}
          >
            Contact Form
          </Typography>
          {/* <Typography variant="body1" mb={3}>
            It couldn't be easier to get in touch with us here at Fun Factor Leeds. You can use the
            contact form below or reach out through:
          </Typography> */}
          <Box component="ul" sx={{ listStyleType: "disc", pl: 4, mb: 3 }}>
            {contactData.map((elem, ind) => (
              <Box component="li" key={ind} mb={1}>
                <Typography component="span" fontWeight="bold">
                  {elem.title}:
                </Typography>{" "}
                <Typography
                  component="span"
                  color={ind === 0 ? "text.primary" : "primary"}
                >
                  {elem.info}
                </Typography>
              </Box>
            ))}
          </Box>
          <Typography variant="body1" mb={1}>
            We operate 7 days a week, 365 days a year.
          </Typography>
          {/* <Typography variant="body1" mb={4}>
            Fun Factor Leeds for all your bouncy castle hire & soft play hire needs in Leeds,
            Wakefield, Castleford, Pontefract and surrounding areas.
          </Typography> */}
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" color="primary" textAlign="center" mb={4}>
              Quick Enquiry Form
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                {contactFormData.map((elem, ind) => (
                  <Grid item xs={12} key={ind}>
                    <Controller
                      name={elem.name}
                      control={control}
                      rules={{
                        ...elem.rules,
                        validate:
                          elem.name === "endDate"
                            ? (value) =>
                                value >= startDate ||
                                "End date cannot be before start date"
                            : undefined,
                      }}
                      render={({ field }) =>
                        elem.type === "textarea" ? (
                          <TextField
                            {...field}
                            multiline
                            rows={5}
                            fullWidth
                            label={elem.label}
                            placeholder={elem.placeHolder}
                            error={!!errors[elem.name]}
                            helperText={errors[elem.name]?.message}
                          />
                        ) : elem.type === "date" ? (
                          <DatePicker
                            {...field}
                            label={elem.label}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                error={!!errors[elem.name]}
                                helperText={errors[elem.name]?.message}
                              />
                            )}
                          />
                        ) : (
                          <TextField
                            {...field}
                            fullWidth
                            type={elem.type}
                            label={elem.label}
                            placeholder={elem.placeHolder}
                            error={!!errors[elem.name]}
                            helperText={errors[elem.name]?.message}
                          />
                        )
                      }
                    />
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
                <Button
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
    </LocalizationProvider>
  );
};

export default Contact;

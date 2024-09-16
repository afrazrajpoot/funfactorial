import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "sonner";
import { useGlobalState } from "../context/globalState";
import { useCreateBookingMutation } from "../store/storeApi";
import Ribbons from "../components/Ribbons";
import { contactData, contactFormData } from "../data";
import CryptoJS from 'crypto-js';

const getCurrentYearMonth = () => {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: String(now.getMonth() + 1).padStart(2, "0"),
  };
};

const Contact = () => {
  const { year, month } = getCurrentYearMonth();
  const [decryptedData, setDecryptedData] = useState({});
  const { itemDetail, setItemDetail } = useGlobalState();
  const [booking, { isLoading, isError, error, isSuccess, data: responseData }] = useCreateBookingMutation();
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
  const endDate = watch("endDate");

  const onSubmit = async (data) => {
    if (!stripe) {
      toast.error("Stripe is not loaded. Please try again later.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Request a Checkout Session from the server
      const { data: { sessionId } } = await axios.post('http://localhost:9000/payment-sheet', {
        amount: parseInt(decryptedData), // Amount in cents
      });

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        toast.error(`Payment error: ${error.message}`);
      }
    } catch (err) {
      toast.error(`Submission error: ${err.message}`);
      console.error("Error during submission:", err.response?.data || err.message);
    } finally {
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
    const decryptedData = decryptAndGetFromLocalStorage('data');
    setDecryptedData(decryptedData?.price.slice(0, 3));
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setItemDetail(null);
      reset();
      toast.success(responseData.message);
    }
    if (isError) {
      toast.error(error?.data?.message || "An error occurred");
    }
  }, [isSuccess, isError, error, responseData, setItemDetail, reset]);

  return (
    <main className="flex flex-col lg:flex-row items-start p-4 gap-8 ">
      <section className="hidden lg:block lg:w-1/4">
        <Ribbons />
      </section>
      <section className="flex-1">
        <h1 className="text-[#ed145b] text-center lg:text-left text-4xl lg:text-5xl font-medium font-ab mb-6">
          Contact Fun Factor Leeds
        </h1>
        <p className="mb-6 text-lg">
          It couldn't be easier to get in touch with us here at Fun Factor Leeds. You can use the
          contact form below or reach out through:
        </p>
        <ul className="list-disc ml-8 text-lg space-y-2 mb-6">
          {contactData?.map((elem, ind) => (
            <li key={ind}>
              <span className="font-bold">{elem.title}:</span>{" "}
              <span className={ind === 0 ? "text-black" : "text-blue-600"}>
                {elem.info}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-lg mb-2">We operate 7 days a week, 365 days a year.</p>
        <p className="text-lg mb-8">
          Fun Factor Leeds for all your bouncy castle hire & soft play hire needs in Leeds,
          Wakefield, Castleford, Pontefract and surrounding areas.
        </p>
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow-xl p-6">
          <h2 className="text-blue-600 text-2xl text-center font-medium font-ab mb-6">
            Quick Enquiry Form
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {contactFormData?.map((elem, ind) => (
              <div key={ind} className="flex flex-col lg:flex-row lg:items-center">
                <label htmlFor={elem.name} className="lg:w-1/3 text-lg font-medium mb-2 lg:mb-0">
                  {elem.label}:
                </label>
                <div className="flex-1">
                  <Controller
                    name={elem.name}
                    control={control}
                    rules={{
                      ...elem.rules,
                      validate: elem.name === "endDate"
                        ? (value) => new Date(value) >= new Date(startDate) || "End date cannot be before start date"
                        : undefined,
                    }}
                    render={({ field }) => (
                      elem.type === "textarea" ? (
                        <textarea
                          {...field}
                          rows={5}
                          placeholder={elem.placeHolder}
                          className={`w-full p-3 border rounded-md ${errors[elem.name] ? 'border-red-500' : 'border-gray-300'}`}
                        />
                      ) : (
                        <input
                          {...field}
                          type={elem.type}
                          placeholder={elem.placeHolder}
                          className={`w-full p-3 border rounded-md ${errors[elem.name] ? 'border-red-500' : 'border-gray-300'}`}
                        />
                      )
                    )}
                  />
                  {errors[elem.name] && (
                    <p className="text-red-500 text-sm mt-1">{errors[elem.name]?.message}</p>
                  )}
                </div>
              </div>
            ))}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="bg-[#ed145b] hover:bg-[#ff1a6b] text-white font-bold py-3 px-6 rounded-md shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting || isLoading ? 'Processing...' : 'Send Enquiry'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Contact;

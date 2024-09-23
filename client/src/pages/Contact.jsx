import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "sonner";
import CryptoJS from 'crypto-js';
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
  const postCodes =   [
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
  ]
  const { year, month } = getCurrentYearMonth();
  const [isLoading,setLoading] = useState(false) 
  const [decryptedData, setDecryptedData] = useState({});
  const [payment,setPAyment] = useState({});
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
  const endDate = watch("endDate");

  const onSubmit = async (data) => {
  
    // setIsSubmitting(true);
  
    try {
      const isValidPostalCode = postCodes.some(code => code === data.postalCode);
      // console.log(isValidPostalCode,'codes')
      if (!isValidPostalCode) {
        toast.error(`Invalid delivery area: ${data.postalCode}`, { position: "top-center" });
        setIsSubmitting(false);
        return;
      }
  
      setLoading(true);
      localStorage.setItem('bookingData',JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        startDate: data.startDate,
        endDate: data.endDate,
        itemDetail
      }))
      if (!stripe) {
        toast.error("Stripe is not loaded. Please try again later.");
        setLoading(false)
        return;
      }
  
      // Decrypt and parse amount
      const amount = parseInt(decryptedData); // Amount in cents
  
      // Request a Checkout Session from the server
      const { data: { sessionId } } = await axios.post('https://www.api.funrides.co.uk/payment-sheet', {
        amount,
        currency: "gbp",
    
        img: `https://www.funrides.co.uk/${itemDetail.image}`,
      });
  
      // Redirect to Stripe Checkout
      const paymentResponse = await stripe.redirectToCheckout({ sessionId });
  setPAyment(paymentResponse)
      // Check if payment was successful
      if (paymentResponse.error) {
        toast.error(`Payment error: ${paymentResponse.error.message}`);
        setLoading(false)
        return;
      }
     setLoading(false)
  
      // Once the payment is successful, create a booking
 
  
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
    setItemDetail(decryptedData);
    setDecryptedData(decryptedData?.price.slice(0, 3));
    console.log(payment,'payment')
  }, [setItemDetail]);



  return (
    <main className="flex flex-col lg:flex-row items-start p-4 gap-8">
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
          {contactData.map((elem, ind) => (
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
            {contactFormData.map((elem, ind) => (
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
                          className={`w-full p-3 border rounded-md ${errors[elem.name] ? 'sudo apt-get install libreofficeborder-red-500' : 'border-gray-300'}`}
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

import React, { useEffect } from "react";
import Ribbons from "../components/Ribbons";
import { contactData, contactFormData } from "../data";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useGlobalState } from "../context/globalState";
import { useCreateBookingMutation } from "../store/storeApi";
import { toast } from "sonner";
// Helper function to get current year and month
const getCurrentYearMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  return { year, month };
};

const Contact = () => {
  const { year, month } = getCurrentYearMonth();
  const { itemDetail, setItemDetail } = useGlobalState();
  const [booking, { isLoading, isError, error, isSuccess, data: responseData }] =
    useCreateBookingMutation();
  const {
    handleSubmit,
    control,
    watch,
    reset,
    setValue, // Used to set default values
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDate: `${year}-${month}-01`, // Setting default to the first day of the current month
      endDate: `${year}-${month}-31`, // Setting default to the last day of the current month
    },
  });

  // Watch the values of startDate and endDate
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const onSubmit = async (data) => {
    // console.log("Form Data:", data); // Check the form data in the console

    // Prepare FormData

    try {
      booking({ ...data, itemDetail });
    } catch (err) {
      console.error("Error booking:", err.response?.data || err.message);
    }
  };

  const textShadowStyle = {
    textShadow:
      "0 0 0 #000, -1px -1px 0 #000, 0 -1px 0 #000, 1px -1px 0 #000, 1px 0 0 #000, 1px 1px 0 #000, 0 1px 0 #000, -1px 1px 0 #000, -1px 0 0 #000",
    color: "#fff",
  };
  useEffect(() => {
    if (isSuccess) {
      setItemDetail(null);
      // console.log(responseData, "res data");
      reset();
     
      toast.success(responseData.message, {
        position: "top-right",
        duration: 1000,
        autoClose: 3000,
      });
    }
    if (isError) {

toast.error(error?.data?.message, {
  position: "top-right",
  duration: 1000,
  autoClose: 3000,
})
      console.log(error, "error");
    }
  }, [isSuccess, isError, error]);
  return (
    <main className="flex items-start p-4">
      <section className="hidden lg:block">
        <Ribbons />
      </section>
      <section className="ml-4">
        <h1 className="text-[#ed145b] text-center lg:text-left text-[7vw] lg:text-[2.3vw] font-medium font-ab mb-4">
          CONTACT FUN FACTOR LEEDS
        </h1>
        <p className="mb-4 lg:text-[1vw]">
          It couldn't be easier to get in touch with us here at Fun Factor Leeds. You can use the
          contact form at the bottom of this page or:
        </p>
        <ul className="list-disc ml-[4vw] text-[1vw]">
          {contactData?.map((elem, ind) => (
            <li key={ind} className="mb-2">
              <h2 className="font-bold text-[3vw] lg:text-[1vw] inline">{elem.title}</h2>
              <p
                className={`${
                  ind === 0 ? "text-black" : "text-blue-400 lg:text-[1vw] text-[3vw]"
                } inline ml-2 text-[3vw] lg:text-[1vw]`}
              >
                {elem.info}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-[1vw] text-[3vw] lg:text-[1vw]">
          We operate 7 days a week 365 days a year.
        </p>
        <p className="mt-[1vw] text-[3vw] lg:text-[1vw]">
          Fun Factor Leeds for all your bouncy castle hire & soft play hire needs in Leeds,
          Wakefield, Castleford, Pontefract and surrounding areas.
        </p>
        <article className="mt-[1vw] bg-blue-200 pt-[2vw] shadow-lg rounded-md">
          <h2 className="text-blue-500 text-[3vw] lg:text-[1.5vw] text-center mt-[-1vw] p-[0.4vw] font-medium font-ab">
            Quick Enquiry Form
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-[2vw] flex flex-col">
            {contactFormData?.map((elem, ind) => (
              <div key={ind} className="mb-4 flex flex-col lg:flex-row lg:items-center">
                <label
                  htmlFor={elem.name}
                  className="lg:w-[30vw] text-[3vw] lg:text-[1vw] text-center lg:text-left"
                >
                  {elem.label}:
                </label>
                <div className="flex-1 flex flex-col">
                  <Controller
                    name={elem.name}
                    control={control}
                    rules={{
                      ...elem.rules,
                      validate:
                        elem.name === "endDate"
                          ? (value) =>
                              new Date(value) >= new Date(startDate) ||
                              "End date cannot be before start date"
                          : undefined,
                    }}
                    render={({ field }) =>
                      elem.type === "textarea" ? (
                        <textarea
                          {...field}
                          rows={5}
                          placeholder={elem.placeHolder}
                          className={`border border-black text-[3vw] lg:text-[1vw] p-[0.5vw] rounded-md flex-1 ${
                            errors[elem.name] ? "border-red-500" : ""
                          }`}
                        />
                      ) : (
                        <input
                          {...field}
                          type={elem.type}
                          placeholder={elem.placeHolder}
                          className={`border border-black text-[3vw] lg:text-[1vw] p-[1.5vw] lg:p-[0.5vw] rounded-md flex-1 ${
                            errors[elem.name] ? "border-red-500" : ""
                          }`}
                        />
                      )
                    }
                  />
                  {errors[elem.name] && (
                    <p className="text-red-500 text-[2.5vw] lg:text-[0.8vw] mt-1 lg:ml-2">
                      {errors[elem.name]?.message}
                    </p>
                  )}
                </div>
              </div>
            ))}
            <input
              style={textShadowStyle}
              type="submit"
              className="bg-[#ed145b] hover:cursor-pointer hover:bg-yellow-400 p-[1.5vw] lg:p-[0.5vw] rounded-md shadow-lg font-playwrite text-[3vw] lg:text-[1.5vw] w-full max-w-[30vw] lg:max-w-[12vw] ml-[55vw] lg:ml-[41.5vw] mt-[1vw]"
              value={"send enquiry"}
            />
          </form>
        </article>
      </section>
    </main>
  );
};

export default Contact;

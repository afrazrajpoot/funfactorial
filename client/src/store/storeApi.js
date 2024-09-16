import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storeApi = createApi({
  reducerPath: "storeApi",
  baseQuery: fetchBaseQuery({ baseUrl: `https://www.api.funrides.co.uk` }),
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (data) => ({
        url: "/api/v1/booking",
        method: "POST",
        body: data,
      }),
    }),
    avalbility: builder.mutation({
      query: (data) => ({
        url: "/api/v1/availability",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateBookingMutation,useAvalbilityMutation } = storeApi;

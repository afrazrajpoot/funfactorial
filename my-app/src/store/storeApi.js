import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storeApi = createApi({
  reducerPath: "storeApi",
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:9000` }),
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (data) => ({
        url: "/api/v1/booking",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateBookingMutation } = storeApi;

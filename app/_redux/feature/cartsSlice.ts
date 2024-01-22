import { AppConfig } from "@/app/_constants/AppConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiCart = createApi({
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${AppConfig.apiURL}`,
  }),
  tagTypes: ["Cart"],
  reducerPath: "apiCart",
  endpoints: (builder) => ({
    getCartApi: builder.query({
      query: () => `Cart`.toLowerCase(),
      providesTags: ["Cart"],
    }),
    getByidCartApi: builder.query({
      query: (id) => `Cart/${id}`.toLowerCase(),
      providesTags: ["Cart"],
    }),
    getByUserIdCartApi: builder.query({
      query: (id) => `Cart/user/${id}`.toLowerCase(),
      providesTags: ["Cart"],
    }),

    deleteCart: builder.mutation({
      query: (id) => ({
        url: `Cart/${id}`.toLowerCase(),
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Cart"],
    }),

    postCart: builder.mutation({
      query: (payload) => ({
        url: `Cart`.toLowerCase(),
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartApiQuery,
  usePostCartMutation,
  useGetByidCartApiQuery,
  useGetByUserIdCartApiQuery,
  useDeleteCartMutation,
} = apiCart;

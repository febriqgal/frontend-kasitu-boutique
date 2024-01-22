import { AppConfig } from "@/app/_constants/AppConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiOrder = createApi({
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${AppConfig.apiURL}`,
  }),
  tagTypes: ["Order"],
  reducerPath: "apiOrder",
  endpoints: (builder) => ({
    getOrderApi: builder.query({
      query: () => `Order`.toLowerCase(),
      providesTags: ["Order"],
    }),
    getByidTokoOrderApi: builder.query({
      query: (id) => `Order/toko/${id}`.toLowerCase(),
      providesTags: ["Order"],
    }),
    getByidOrderApi: builder.query({
      query: (id) => `Order/${id}`.toLowerCase(),
      providesTags: ["Order"],
    }),
    getByStatusOrderApi: builder.query({
      query: (id) => `Order/status/${id}`.toLowerCase(),
      providesTags: ["Order"],
    }),
    getByUserIdOrderApi: builder.query({
      query: (ide) => `Order/user/${ide}`.toLowerCase(),
      providesTags: ["Order"],
    }),

    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `Order/${id}`.toLowerCase(),
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Order"],
    }),

    postOrder: builder.mutation({
      query: (payload) => ({
        url: `Order`.toLowerCase(),
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetByidTokoOrderApiQuery,
  useGetOrderApiQuery,
  useGetByStatusOrderApiQuery,
  usePostOrderMutation,
  useGetByidOrderApiQuery,
  useGetByUserIdOrderApiQuery,
  useDeleteOrderMutation,
} = apiOrder;

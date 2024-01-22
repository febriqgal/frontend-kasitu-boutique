import { AppConfig } from "@/app/_constants/AppConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiProduct = createApi({
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${AppConfig.apiURL}`,
  }),
  tagTypes: ["Product"],
  reducerPath: "apiProduct",
  endpoints: (builder) => ({
    getProductApi: builder.query({
      query: () => `Product`.toLowerCase(),
      providesTags: ["Product"],
    }),
    getByidProductApi: builder.query({
      query: (id) => `Product/${id}`.toLowerCase(),
      providesTags: ["Product"],
    }),
    getByUserIdProductApi: builder.query({
      query: (ide) => `Product/user/${ide}`.toLowerCase(),

      providesTags: ["Product"],
    }),
    getSearchProductApi: builder.query({
      query: (id) => `Product/search/${id}`.toLowerCase(),
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `Product/${id}`.toLowerCase(),
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Product"],
    }),

    postProduct: builder.mutation({
      query: (payload) => ({
        url: `Product`.toLowerCase(),
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductApiQuery,
  usePostProductMutation,
  useGetByidProductApiQuery,
  useGetByUserIdProductApiQuery,
  useDeleteProductMutation,
  useGetSearchProductApiQuery,
} = apiProduct;

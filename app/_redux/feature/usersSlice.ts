import { AppConfig } from "@/app/_constants/AppConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiUser = createApi({
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${AppConfig.apiURL}`,
  }),
  tagTypes: ["User"],
  reducerPath: "apiUser",
  endpoints: (builder) => ({
    getUserApi: builder.query({
      query: () => `User`.toLowerCase(),
      providesTags: ["User"],
    }),
    getUserByIdApi: builder.query({
      query: (id) => `User/${id}`.toLowerCase(),
      providesTags: ["User"],
    }),
    postUser: builder.mutation({
      query: (payload) => ({
        url: `user`.toLowerCase(),
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `user/${id}`.toLowerCase(),
        method: "PATCH",
        body: patch,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserApiQuery,
  usePostUserMutation,
  useGetUserByIdApiQuery,
  useUpdateUserMutation,
} = apiUser;

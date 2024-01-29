import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  HealthCheckResponse,
  Tags,
  Connections,
} from "./types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getHealthCheck: builder.query<HealthCheckResponse, void>({
      query: () => "health_check",
    }),
    getTags: builder.query<Tags[], void>({
      query: () => "tags",
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "users/login",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation<void, LogoutRequest>({
      query: (body) => ({
        url: "users/logout",
        method: "POST",
        body,
      }),
    }),
    createLogin: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "users",
        method: "POST",
        body,
      }),
    }),
    getConnections: builder.query<Connections[], void>({
      query: () => "connections",
    }),
    deleteConnection: builder.mutation<void, string>({
      query: (id) => ({
        url: `connections/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetHealthCheckQuery,
  useGetTagsQuery,
  useLoginMutation,
  useLogoutMutation,
  useGetConnectionsQuery,
  useDeleteConnectionMutation,
  useCreateLoginMutation
} = api;

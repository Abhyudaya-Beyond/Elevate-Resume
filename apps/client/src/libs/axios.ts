import { t } from "@lingui/macro";
import type { ErrorMessage } from "@elevate/utils";
import { deepSearchAndParseDates } from "@elevate/utils";
import _axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { redirect } from "react-router";

import { refreshToken } from "@/client/services/auth";
import { useAuthStore } from "@/client/stores/auth";

import { USER_KEY } from "../constants/query-keys";
import { toast } from "../hooks/use-toast";
import { translateError } from "../services/errors/translate-error";
import { queryClient } from "./query-client";

export const axios = _axios.create({ baseURL: "/api", withCredentials: true });

// Intercept responses to transform ISO dates to JS date objects
axios.interceptors.response.use(
  (response) => {
    const transformedResponse = deepSearchAndParseDates(response.data, ["createdAt", "updatedAt"]);
    return { ...response, data: transformedResponse };
  },
  (error) => {
    const message = error.response?.data.message as ErrorMessage;
    const description = translateError(message);

    // Don't show toast for 403 errors from refresh endpoint (user not logged in)
    const isRefreshEndpoint = error.config?.url?.includes("/auth/refresh");
    if (description && !isRefreshEndpoint) {
      toast({
        variant: "error",
        title: t`Oops, the server returned an error.`,
        description,
      });
    }

    return Promise.reject(new Error(message));
  },
);

// Create another instance to handle failed refresh tokens
// Reference: https://github.com/Flyrell/axios-auth-refresh/issues/191
const axiosForRefresh = _axios.create({ baseURL: "/api", withCredentials: true });

// Interceptor to handle expired access token errors
// Only attempt refresh if user is logged in and error is not from refresh endpoint
const handleAuthError = (failedRequest: any) => {
  // Check if user is logged in
  const user = useAuthStore.getState().user;
  if (!user) {
    // User not logged in, don't attempt refresh
    return Promise.reject(failedRequest);
  }

  // Check if this is already a refresh request to prevent infinite loop
  if (failedRequest.config?.url?.includes("/auth/refresh")) {
    return Promise.reject(failedRequest);
  }

  return refreshToken(axiosForRefresh);
};

// Interceptor to handle expired refresh token errors
const handleRefreshError = async () => {
  await queryClient.invalidateQueries({ queryKey: USER_KEY });
  redirect("/auth/login");
};

// Intercept responses to check for 401 errors only (403 can mean forbidden, not just expired token)
// Only attempt refresh for 401 (Unauthorized) - token expired
// 403 (Forbidden) might mean no access, not necessarily expired token
createAuthRefreshInterceptor(axios, handleAuthError, { 
  statusCodes: [401], // Only catch 401, not 403
  skipWhileRefreshing: true,
});
createAuthRefreshInterceptor(axiosForRefresh, handleRefreshError);

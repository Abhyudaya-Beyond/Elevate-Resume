import { useEffect, useRef } from "react";

import { axios } from "../libs/axios";
import { refreshToken } from "../services/auth/refresh";
import { useAuthStore } from "../stores/auth";

type Props = {
  children: React.ReactNode;
};

/**
 * The AuthRefreshProvider wrapper is responsible for refreshing
 * the access token every 5 minutes while the user is authenticated.
 *
 * @param children The children to render.
 */
export const AuthRefreshProvider = ({ children }: Props) => {
  const intervalId = useRef<NodeJS.Timeout>();
  const isLoggedIn = useAuthStore((state) => !!state.user);

  useEffect(() => {
    if (!isLoggedIn) {
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = undefined;
      }
      return;
    }

    const _refreshToken = async () => {
      try {
        await refreshToken(axios);
      } catch (error) {
        // Silently handle refresh errors (user might have logged out)
        // The axios interceptor will handle redirecting to login if needed
        console.debug("Token refresh failed:", error);
      }
    };

    // Refresh immediately on mount, then every 5 minutes
    void _refreshToken();
    intervalId.current = setInterval(_refreshToken, 5 * 60 * 1000);

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = undefined;
      }
    };
  }, [isLoggedIn]);

  return children;
};

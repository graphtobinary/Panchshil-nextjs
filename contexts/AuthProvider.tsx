"use client";

import { useState, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { getAuthToken } from "@/api/CMS.api";

interface AuthTokenResponse {
  token: string;
}

interface AuthProviderProps {
  children: ReactNode;
  initialToken: string | null;
  initialError?: string | null;
}

export const AuthProvider = ({
  children,
  initialToken,
  initialError = null,
}: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(initialToken);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(initialError);

  const fetchToken = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = (await getAuthToken()) as AuthTokenResponse;

      if (response?.token && typeof response.token === "string") {
        setToken(response.token);
      } else {
        throw new Error("Token not found in response");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch auth token";
      setError(errorMessage);
      console.error("Error fetching auth token:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshToken = async () => {
    await fetchToken();
  };

  const value = {
    token,
    isLoading,
    error,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

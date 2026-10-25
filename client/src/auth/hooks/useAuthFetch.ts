import React from "react";
import authServices from "../services/auth.services";
import axios, { AxiosError } from "axios";
import type { dataErrorResponse, dataTypeResponse } from "../Types";

type useAuthFetchProps = {
  url: string;
  auth?: { username: string; password: string } | undefined;
  data?: any | undefined;
  onError: (message: AxiosError<dataErrorResponse>) => any | void;
  onSuccess: (message: string) => any | void;
};

const useAuthFetch = ({
  url,
  auth,
  data,
  onError,
  onSuccess,
}: useAuthFetchProps) => {
  const [message, setMessage] = React.useState<string>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  async function fetchAPI() {
    setIsLoading(true);

    try {
      const response = await authServices.post<dataTypeResponse>(
        `${import.meta.env.VITE_BASEURL_SERVER}/auth${url}`,
        data,
        {
          auth: auth,
        },
      );

      setMessage(response.data.message);
      setIsLoading(false);
      setIsSuccess(true);
      onSuccess(response.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message);
        onError(error);
      } else {
        setMessage("Internal Server Error");
      }

      setIsLoading(false);
      setIsSuccess(false);
      setIsError(true);
    }
  }

  return { message, isLoading, fetchAPI, isSuccess, isError };
};

export default useAuthFetch;

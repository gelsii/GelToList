import apiServices from "@/services/api.services";
import type { errorMessageResponse } from "@/types/errorMessageResponse";
import type { MessageResponse } from "@/types/messageResponse";
import axios, { AxiosError } from "axios";
import React from "react";

type useOnFetchProps = {
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  dataAxios?: any;
  onSuccess: (data: MessageResponse) => void | any;
  onError: (error: AxiosError<errorMessageResponse>) => void | any;
  params?: any;
};

const useOnFetch = <D>({
  url,
  method,
  dataAxios,
  onSuccess,
  onError,
  params,
}: useOnFetchProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState<D>();
  const [errorMessage, setErrorMessage] = React.useState("");

  async function fetchAPI() {
    setIsLoading(true);
    try {
      const response = await apiServices({
        url,
        method,
        data: dataAxios,
        params: params,
      });

      setIsLoading(false);
      setData(response.data);
      onSuccess(response.data);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.detail);
        onError(error);
      } else {
        onError(error);
      }

      setIsLoading(false);
    }
  }

  return { isLoading, data, errorMessage, fetchAPI };
};

export default useOnFetch;

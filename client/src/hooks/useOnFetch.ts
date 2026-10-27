import AccessTokenContext from "@/contexts/userToken";
import apiServices from "@/services/api.services";
import type { errorMessageResponse } from "@/types/errorMessageResponse";
import type { MessageResponse } from "@/types/messageResponse";
import axios, { AxiosError } from "axios";
import React from "react";

type useOnFetchProps = {
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  dataAxios?: any;
  onSuccess?: (data: MessageResponse) => void | any;
  onError?: (error: AxiosError<errorMessageResponse>) => void | any;
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
  const [isSuccess, setIsSuccess] = React.useState(false);

  const token = React.useContext(AccessTokenContext);

  async function fetchAPI() {
    setIsLoading(true);
    try {
      const response = await apiServices({
        url,
        method,
        data: dataAxios,
        params: params,
        headers: {
          Authorization: `Bearer ${token?.accessToken}`,
        },
      });

      setIsLoading(false);
      setData(response.data);
      setIsSuccess(true);
      if (onSuccess) onSuccess(response.data);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.detail);
      } else {
        setErrorMessage("Internal Server Error");
      }

      if (onError) onError(error);

      setIsLoading(false);
    }
  }

  return { isLoading, data, errorMessage, fetchAPI, isSuccess };
};

export default useOnFetch;

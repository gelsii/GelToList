import type { dataErrorResponse, dataTypeResponse } from "@/auth/Types";
import accessTokenContext from "@/contexts/accessToken";
import apiServices from "@/services/api.services";
import axios, { AxiosError } from "axios";
import React from "react";

type useOnFetchProps = {
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  dataAxios?: any;
  onSuccess: (data: dataTypeResponse) => void | any;
  onError: (error: AxiosError<dataErrorResponse>) => void | any;
};

const useOnFetch = ({
  url,
  method,
  dataAxios,
  onSuccess,
  onError,
}: useOnFetchProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState();
  const [errorMessage, setErrorMessage] = React.useState("");
  const tokenContext = React.useContext(accessTokenContext);

  async function fetchAPI() {
    setIsLoading(true);
    try {
      const response = await apiServices({
        url,
        method,
        data: dataAxios,
        headers: {
          Authorization: `Bearer ${tokenContext?.token}`,
        },
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

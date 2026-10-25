import apiServices from "@/services/api.services";
import axios from "axios";
import React from "react";

type useFetchProps = {
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  onFetching?: (data: any) => void | any;
  dataAxios?: any;
};

const useFetch = <D>({ url, method, onFetching, dataAxios }: useFetchProps) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState<D>();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    async function fetchAPI() {
      try {
        const response = await apiServices({
          url,
          method,
          data: dataAxios,
        });

        setIsLoading(false);
        setData(response.data);
        setIsSuccess(true);

        if (onFetching) onFetching(response.data);
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data.detail);
        }

        setIsLoading(false);
        setIsError(true);
      }
    }

    fetchAPI();
  }, [dataAxios, onFetching, method, url]);

  return { isLoading, data, errorMessage, isSuccess, isError };
};

export default useFetch;

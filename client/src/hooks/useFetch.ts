import apiServices from "@/services/api.services";
import axios from "axios";
import React, { memo } from "react";

type useFetchProps = {
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  onFetching: (data: any) => void | any;
  dataAxios?: any;
};

const useFetch = ({ url, method, onFetching, dataAxios }: useFetchProps) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState();
  const [errorMessage, setErrorMessage] = React.useState("");

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

        onFetching(response.data);
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data.detail);
        }

        setIsLoading(false);
      }
    }

    fetchAPI();
  }, [dataAxios, onFetching, method, url]);

  return { isLoading, data, errorMessage };
};

export default useFetch;

import TitleComponent from "@/components/ui/TitleComponent";
import accessTokenContext from "@/contexts/accessToken";
import useFetch from "@/hooks/useFetch";
import React from "react";
import { Outlet } from "react-router";

const HomeLayout = React.memo(function HomeLayout() {
  const tokenContext = React.useContext(accessTokenContext);

  const { isLoading } = useFetch({
    url: "/auth/token",
    method: "GET",
    onFetching: React.useCallback(
      (data) => {
        tokenContext?.setToken(data?.access_token);
      },
      [tokenContext],
    ),
  });

  return (
    <section className="w-full h-full gap-4 flex flex-col justify-start items-center ">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <TitleComponent />
          <Outlet />
        </>
      )}
    </section>
  );
});

export default HomeLayout;

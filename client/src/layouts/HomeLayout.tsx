import TitleComponent from "@/components/ui/TitleComponent";
import currentlyUser from "@/contexts/currentUser";
import useFetch from "@/hooks/useFetch";
import type { responseUser } from "@/types/currentlyUser";
import React, { useCallback } from "react";
import { Outlet } from "react-router";

const HomeLayout = React.memo(function HomeLayout() {
  const User = React.useContext(currentlyUser);

  const { isLoading } = useFetch({
    url: "/auth/token",
    method: "POST",
    onFetching: useCallback((data: responseUser) => {
      User?.setUser(() => data.info_user);
    }, []),
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

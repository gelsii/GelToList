import TitleComponent from "@/components/ui/TitleComponent";
import currentlyUser from "@/contexts/currentUser";
import useFetch from "@/hooks/useFetch";
import type { responseUser } from "@/types/currentlyUser";
import React, { useCallback } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import AccessTokenContext from "@/contexts/userToken";
import type { accessTokenResponse } from "@/types/tokenResponse";

const HomeLayout = React.memo(function HomeLayout() {
  const token = React.useContext(AccessTokenContext);
  const navigate = useNavigate();

  const { isLoading, isSuccess, isError, errorMessage } = useFetch({
    url: "/auth/token",
    method: "GET",
    onFetching: useCallback((data: accessTokenResponse) => {
      token?.setAccessToken(data.access_token);
    }, []),
  });

  return (
    <section className="w-full h-full gap-4 flex flex-col justify-start items-center ">
      {isLoading && <h1>Loading...</h1>}

      {isSuccess && (
        <>
          <TitleComponent />
          <Outlet />
        </>
      )}

      {isError && (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>{errorMessage}</EmptyTitle>
            <EmptyDescription>
              You are not authenticated. Please log in to your account to access
              this resource.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              className="w-38 "
              onClick={() => navigate("/", { replace: true })}
            >
              login
            </Button>
          </EmptyContent>
        </Empty>
      )}
    </section>
  );
});

export default HomeLayout;

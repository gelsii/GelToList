import apiServices from "@/services/api.services";
import axios from "axios";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const navigate = useNavigate();
  const [isShowContent, setIsShowContent] = React.useState(false);

  useEffect(() => {
    async function authToken() {
      try {
        const response = await apiServices.get("auth/token");

        if (response.status == 200) {
          setIsShowContent(true);
          navigate("/todoList", { replace: true });
        }
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          throw Error("You may now Sign In or SignUp");
        }
      }
    }

    authToken();
  }, [navigate]);

  if (isShowContent) {
    return <h1>loading...</h1>;
  }

  return (
    <section className="w-full h-full flex justify-center items-center">
      {!isShowContent && <Outlet />}
    </section>
  );
};

export default AuthLayout;

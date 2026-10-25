import React from "react";
import accessTokenContext from "@/contexts/accessToken";
type ContextProviderProps = {
  children: React.ReactNode;
};

const ContextProvider = ({ children }: ContextProviderProps) => {
  const [token, setToken] = React.useState("");
  return (
    <section>
      <accessTokenContext.Provider value={{ token, setToken }}>
        {children}
      </accessTokenContext.Provider>
    </section>
  );
};

export default ContextProvider;

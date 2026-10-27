import React from "react";
import currentlyUser from "@/contexts/currentUser";
import type { User } from "@/types/currentlyUser";
import AccessTokenContext from "@/contexts/userToken";

type ContextProviderProps = {
  children: React.ReactNode;
};

const ContextProvider = ({ children }: ContextProviderProps) => {
  const [user, setUser] = React.useState<User | undefined>(undefined);
  const [accessToken, setAccessToken] = React.useState<string | null>(null);
  return (
    <section>
      <currentlyUser.Provider value={{ user, setUser }}>
        <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
          {children}
        </AccessTokenContext.Provider>
      </currentlyUser.Provider>
    </section>
  );
};

export default ContextProvider;

import React from "react";
import currentlyUser from "@/contexts/currentUser";
import type { User } from "@/types/currentlyUser";

type ContextProviderProps = {
  children: React.ReactNode;
};

const ContextProvider = ({ children }: ContextProviderProps) => {
  const [user, setUser] = React.useState<User | undefined>(undefined);
  return (
    <section>
      <currentlyUser.Provider value={{ user, setUser }}>
        {children}
      </currentlyUser.Provider>
    </section>
  );
};

export default ContextProvider;

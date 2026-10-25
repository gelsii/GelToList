import type { User } from "@/types/currentlyUser";
import { createContext } from "react";

const currentlyUser = createContext<{
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
} | null>(null);

export default currentlyUser;

import { createContext } from "react";

const accessTokenContext = createContext<{
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);

export default accessTokenContext
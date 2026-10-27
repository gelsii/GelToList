import { createContext } from "react";

type tokenType = {
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
};

const AccessTokenContext = createContext<tokenType | null>(null);

export default AccessTokenContext;

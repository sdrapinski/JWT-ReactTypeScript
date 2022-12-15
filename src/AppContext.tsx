import { createContext, useState } from "react";

interface AppContextInterface {
  accessToken: string;
  setaccessToken: (newstring: string) => void;
}
interface AppProviderProps {
  children?: React.ReactNode;
}

export const AppContext = createContext<AppContextInterface | null>(null);

const AppProvider = ({ children }: AppProviderProps) => {
  const [accessToken, setaccessToken] = useState("");
  return (
    <AppContext.Provider value={{ accessToken, setaccessToken }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

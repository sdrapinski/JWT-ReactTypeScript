import { createContext, useState } from "react";

interface AppContextInterface {
  accessToken: string | null;
  setaccessToken: (newstring: string | null) => void;
  apiEndPoint: string;
}
interface AppProviderProps {
  children?: React.ReactNode;
}

export const AppContext = createContext<AppContextInterface | null>(null);

const AppProvider = ({ children }: AppProviderProps) => {
  const apiEndPoint = "http://localhost:8000";
  const [accessToken, setaccessToken] = useState<string | null>(null);
  return (
    <AppContext.Provider value={{ accessToken, setaccessToken, apiEndPoint }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

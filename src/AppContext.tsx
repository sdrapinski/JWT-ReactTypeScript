import { createContext, useState } from "react";
import jwt from "jwt-decode";
import Cookies from "universal-cookie";

interface AppContextInterface {
  accessToken: string | null;
  setaccessToken: (newstring: string | null) => void;
  apiEndPoint: string;
  createUser: (token: string) => User;
  createUserAndRefreshToken: (data: JwtInterface) => void;
}
interface AppProviderProps {
  children?: React.ReactNode;
}

interface User {
  email: string;
  exp: number;
  iat: number;
  id: number;
  name: string;
}

interface JwtInterface {
  accessToken: string;
  refreshToken: string;
}

export const AppContext = createContext<AppContextInterface | null>(null);

const AppProvider = ({ children }: AppProviderProps) => {
  const apiEndPoint = "http://localhost:8000";
  const [accessToken, setaccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User>();

  const cookie = new Cookies();

  const createUser = (accessToken: string) => {
    const decoded: User = jwt(accessToken);
    setaccessToken(accessToken);
    console.log(decoded);
    setUser(decoded);
    const expirationDate = new Date(decoded.exp * 1000);
    console.log(expirationDate);
    return decoded;
  };

  const createUserAndRefreshToken = (data: JwtInterface) => {
    const user = createUser(data.accessToken);

    //set cookie
    cookie.set("jwt_RefreshToken", data.refreshToken, {
      expires: new Date(user.exp * 1000),
    });
  };

  return (
    <AppContext.Provider
      value={{
        accessToken,
        setaccessToken,
        apiEndPoint,
        createUser,
        createUserAndRefreshToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

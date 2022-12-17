import { createContext, useState } from "react";
import jwt from "jwt-decode";
import Cookies from "universal-cookie";
import axios from "axios";

interface AppContextInterface {
  accessToken: string | null;
  setaccessToken: (newstring: string | null) => void;
  apiEndpoint: string;
  createUser: (token: string) => void;
  createUserAndRefreshToken: (data: JwtInterface) => void;
  isAccessTokenExpired: () => void;
  getNewAccessToken: () => Promise<string | undefined>;
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
  const apiEndpoint = "http://localhost:8000";
  const [accessToken, setaccessToken] = useState<string | null>(null);
  const [expirationDate, setexpirationDate] = useState<Date>();
  const [user, setUser] = useState<User>();

  const cookie = new Cookies();

  // User

  const createUser = (accessToken: string) => {
    const decoded: User = jwt(accessToken);
    setaccessToken(accessToken);
    console.log(decoded);
    setUser(decoded);
    setexpirationDate(new Date(decoded.exp * 1000));
  };

  const createUserAndRefreshToken = (data: JwtInterface) => {
    const decoded: User = jwt(data.refreshToken);
    createUser(data.accessToken);

    //set cookie
    cookie.set("jwt_RefreshToken", data.refreshToken, {
      expires: new Date(decoded.exp * 1000),
    });
  };

  // Token

  const isAccessTokenExpired = () => {
    const today = new Date();

    if (expirationDate && expirationDate > today) {
      return false;
    } else {
      return true;
    }
  };

  const getNewAccessToken = async () => {
    const refreshToken = cookie.get("jwt_RefreshToken");
    let token: JwtInterface = { accessToken: "", refreshToken: "" };
    if (refreshToken) {
      await axios
        .post(
          `${apiEndpoint}/refresh-token`,
          { token: refreshToken },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          token = response.data;
          createUser(token.accessToken);
        })
        .catch((error) => {
          console.error(error);
          return "";
        });
      return token.accessToken;
    } else {
      console.error("no access token");
      return "";
    }
  };

  return (
    <AppContext.Provider
      value={{
        accessToken,
        setaccessToken,
        apiEndpoint,
        createUser,
        createUserAndRefreshToken,
        isAccessTokenExpired,
        getNewAccessToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

import axios from "axios";
import React, { useState, useContext } from "react";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import { AppContext } from "../AppContext";

interface GetTokensResponse {
  token: string;
  refreshToken: string;
}

interface User {
  email: string;
  exp: number;
  iat: number;
  id: number;
  name: string;
}

const Login = () => {
  const [email, setemail] = useState("");
  const [user, setUser] = useState<User>();
  const [password, setpassword] = useState("");
  const appContext = useContext(AppContext);

  const cookie = new Cookies();

  const handleEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
    setemail(e.currentTarget.value);
  };
  const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setpassword(e.currentTarget.value);
  };

  const login = (jwt_token: string) => {
    const decoded: User = jwt(jwt_token);
    console.log(decoded);
    setUser(decoded);

    //set cookie
    cookie.set("jwt_authorization", jwt_token, {
      expires: new Date(decoded.exp * 1000),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await axios.post<GetTokensResponse>(
      "http://localhost:8000/login",
      { email: email },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    console.log(data);
    login(data.refreshToken);
    appContext?.setaccessToken(data.token);
  };

  return (
    <div>
      <form action="#" onSubmit={handleSubmit} method="POST">
        <label>
          {" "}
          email
          <input type="email" value={email} onChange={handleEmailChange} />{" "}
        </label>{" "}
        <br />
        <label>
          {" "}
          haslo
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />{" "}
        </label>{" "}
        <br />
        <input type="submit" value="Wyslij" />
      </form>
    </div>
  );
};

export default Login;

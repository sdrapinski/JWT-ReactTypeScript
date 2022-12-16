import axios from "axios";
import React, { useState, useContext } from "react";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import { AppContext } from "../AppContext";

interface UserResponse {
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
  const [email, setemail] = useState("jakis@email.com");
  const [user, setUser] = useState<User>();
  const [password, setpassword] = useState("");
  const [info, setinfo] = useState("");
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
    cookie.set("jwt_RefreshToken", jwt_token, {
      expires: new Date(decoded.exp * 1000),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data;
    axios
      .post<UserResponse>(
        `${appContext!.apiEndPoint}/login`,
        { email: email },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        data = response.data;

        login(data.refreshToken);
        appContext?.setaccessToken(data.token);
        setinfo("Zalogowano");
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
        setinfo(error.response.data);
      });
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
      {info}
    </div>
  );
};

export default Login;

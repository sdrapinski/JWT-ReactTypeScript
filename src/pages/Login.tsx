import axios from "axios";
import React, { useState, useContext } from "react";

import { AppContext } from "../AppContext";

interface JwtInterface {
  accessToken: string;
  refreshToken: string;
}

const Login = () => {
  const [email, setemail] = useState("jakis@email.com");

  const [password, setpassword] = useState("");
  const [info, setinfo] = useState("");
  const appContext = useContext(AppContext);

  const handleEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
    setemail(e.currentTarget.value);
  };
  const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setpassword(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data;
    axios
      .post<JwtInterface>(
        `http://localhost:8000/api/v1/users`,
        {
          email: "hihidam411@khaxan1.com",
          password: "Szymon123@#XD",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        data = response.data;
        console.log(data);
        console.log("ok");
        // appContext?.createUserAndRefreshToken(data);
        //  setinfo("Zalogowano");
      })
      .catch((error) => {
        console.error(error);
        // setinfo(error.response.data);
      });
  };

  return (
    <div>
      {appContext?.user ? (
        <ul>
          <li> {appContext.user.name} </li>
          <li> {appContext.user.email} </li>
        </ul>
      ) : (
        <form action="#" onSubmit={handleSubmit} method="POST">
          <label>
            {" "}
            email
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
            />{" "}
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
      )}

      {info}
    </div>
  );
};

export default Login;

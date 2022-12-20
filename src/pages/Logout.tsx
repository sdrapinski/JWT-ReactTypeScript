import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../AppContext";
import Cookies from "universal-cookie";
const Logout = () => {
  const appContext = useContext(AppContext);
  const cookie = new Cookies();
  const [buttonText, setbuttonText] = useState("");

  useEffect(() => {
    if (appContext?.accessToken) {
      setbuttonText("Wyloguj");
    } else {
      setbuttonText("Brak uzytkownika");
    }
  }, [appContext?.accessToken]);

  const logout = () => {
    appContext?.setaccessToken(null);
    appContext?.setUser(undefined);
    cookie.remove("jwt_RefreshToken");
  };

  return (
    <div>
      <button
        onClick={logout}
        disabled={buttonText === "Wyloguj" ? false : true}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Logout;

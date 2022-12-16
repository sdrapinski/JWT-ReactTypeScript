import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Cookies from "universal-cookie";
import { AppContext } from "../AppContext";

const Admin = () => {
  const [data, setdata] = useState("");
  const appContext = useContext(AppContext);

  useEffect(() => {
    axios
      .get(`${appContext!.apiEndPoint}/admin`, {
        headers: {
          authorization: `Bearer ${appContext?.accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return <div>Admin</div>;
};

export default Admin;

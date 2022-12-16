import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../AppContext";

const Admin = () => {
  const [data, setdata] = useState("");
  const appContext = useContext(AppContext);

  useEffect(() => {
    if (appContext?.accessToken)
      axios
        .get(`${appContext!.apiEndPoint}/admin`, {
          headers: {
            authorization: `Bearer ${appContext?.accessToken}`,
          },
        })
        .then((response) => {
          console.log(response);
          setdata(response.data);
        })
        .catch((error) => {
          console.error(error);
          setdata("Cos poszło nie tak");
        });
  }, []);

  return <div> {data}</div>;
};

export default Admin;

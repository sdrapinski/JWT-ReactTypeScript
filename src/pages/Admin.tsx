import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../AppContext";

const Admin = () => {
  const [data, setdata] = useState("");
  const appContext = useContext(AppContext);

  useEffect(() => {
    async function fetch() {
      let token = appContext?.accessToken;
      if (appContext?.isAccessTokenExpired()) {
        token = await appContext.getNewAccessToken();
        if (token === undefined) {
          token = appContext?.accessToken;
          console.error("Token is undefined!");
        }
      }

      axios
        .get(`${appContext!.apiEndpoint}/admin`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setdata(response.data);
        })
        .catch((error) => {
          setdata("Cos poszło nie tak");
        });
    }
    fetch();
  }, []);

  return (
    <div>
      {" "}
      {data}{" "}
      <button onClick={appContext?.getNewAccessToken}>Nowy token </button>{" "}
    </div>
  );
};

export default Admin;

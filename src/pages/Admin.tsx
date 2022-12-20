import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../AppContext";

const Admin = () => {
  const [data, setdata] = useState("");
  const appContext = useContext(AppContext);

  useEffect(() => {
    async function fetch() {
      let token = await appContext?.checkAccessToken();

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
          setdata("Brak dostępu");
          console.error(error);
        });
    }
    fetch();
  }, []);

  return (
    <div>
      {" "}
      {data}{" "}
      <button onClick={appContext?.getNewAccessToken}>
        Nowy token - opcja reczna{" "}
      </button>{" "}
    </div>
  );
};

export default Admin;

import React, { useContext } from "react";
import { AppContext } from "../AppContext";

const Home = () => {
  const appContext = useContext(AppContext);
  return (
    <div>
      {appContext?.accessToken ? (
        <div> {appContext?.accessToken} </div>
      ) : (
        <div> brak usera </div>
      )}
    </div>
  );
};

export default Home;

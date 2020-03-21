import React, { useState, useEffect, useContext } from "react";

// import { AppContext } from "../context/appContext";
// import axios from "axios";

const Home = () => {
  // const [state, setState] = useContext(AppContext);
  // const [testData, setTestData] = useState({});
  // useEffect(() => {
  //   axios.get("/api/landlords/1").then(vals => setTestData(vals.data));
  // }, []);

  // console.log(state);

  return (
    <>
      <h1>Home</h1>
      <p>Dashboard components here</p>
      <h2>Connect to API</h2>
      {/* This is connected to <code>api/landlords/1</code>. Make sure to run the Rails server on
      Vagrant if you don't see any JSON below
      <pre>{JSON.stringify(testData)}</pre> */}
    </>
  );
};

export default Home;

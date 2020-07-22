import React, { useState, useEffect } from "react";
import "./App.css";

const ngrok = "https://44c1e46eacf5.ngrok.io";

const App = () => {
  const [data, setData] = useState();

  const [loggedin, setloggedin] = useState(false);

  useEffect(() => {
    console.log("useEffect");
    getdata();
  }, []);

  const login = async () => {
    window.location.href = `${ngrok}/auth/facebook`;
  };

  const logout = async () => {
    await setloggedin(false);
    window.location.href = `${ngrok}/logout`;
  };

  const getdata = async () => {
    await setloggedin(true);
    const response = await fetch(`${ngrok}/login/success`, {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    });
    const data = await response.json();
    if (data) {
      await setData(data.user);
    }else{
      await setloggedin(false);
    }
  };

  console.log(loggedin);

  return (
    <div className="App">
      <header className="App-header">
        <div>

          <div>
            <button onClick={login}> Login </button>
            <button onClick={logout}> logout </button>
          </div>

          <br />

          { loggedin === true && data === undefined 
          ? (<div> Loading ... </div>) 
          : loggedin === true && data !== undefined 
          ? (
            <div>
              <p> ID : {data.id} </p>
              <p> Name : {data.displayName}</p>
              <p>Provider : {data.provider}</p>
            </div>
            ) 
          : loggedin === false 
          ? (<div> Please Login ... </div>) 
          : ("")}
        </div>
      </header>
    </div>
  );
};

export default App;

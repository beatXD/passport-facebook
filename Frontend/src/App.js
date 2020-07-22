import React, { useState, useEffect } from "react";
import "./App.css";

const ngrok = "https://44c1e46eacf5.ngrok.io";

const  App = () => {

  const [data, setData] = useState()

  const [loggedin, setloggedin] = useState(null)

  useEffect(()=> {
    console.log('useEffect')
    getdata()

  },[])

  const login = async () => {
    window.location.href = `${ngrok}/auth/facebook`;
  };

  const logout = async () => {
    window.location.href = `${ngrok}/logout`;
  };

  const getdata = async () => {
    const response = await fetch(`${ngrok}/login/success`, {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    });
    const data = await response.json();
    if ( data ) {
      await setData(data.user)
      await setloggedin(true)
    } else {
      await setloggedin(false)
    }

  };

  return (
    <div className="App">
      <header className="App-header">
       
        <div>
          <button onClick={login}> Login </button>
          <button onClick={logout}> logout </button>
        </div>

        <br />

        {loggedin === true
        ? <div>
          <p> ID : {data !== undefined ? data.id : 'undefiend'} </p>
          <p> Name : {data !== undefined ? data.displayName : 'undefiend' } </p>
          <p> Provider : {data !== undefined ? data.provider : 'undefiend' } </p>
          </div>
        : loggedin === false
        ? <div> Please Login ... </div>
        : <div> Loading ... </div>
        }

      </header>
    </div>
  );
}

export default App;

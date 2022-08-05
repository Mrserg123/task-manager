import React from "react";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import { useState } from "react";
import "../Login/styles.scss";
const Login: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <Header />
      <main>
        <div className="content">
          <div className="form_login">
            <h4
              style={{ fontSize: "25px", margin: "20px", letterSpacing: "1px" }}
            >
              Please, log in or sign up
            </h4>
            <input
              type="text"
              placeholder="Login"
              onChange={(e) => setLogin(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn">Login/Sign in</button>
          </div>
        </div>
      </main>
    </>
  );
};
export default Login;

import React from "react";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import { useState } from "react";
import "../Login/styles.scss";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { addUser, logIn } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

interface User {
  login: string;
  pass: string;
}

const Login: React.FC = () => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    isRegister: false,
    label: "",
    isError: false,
  });

  const users = JSON.parse(localStorage.users);
  function auth() {
    let findUser = users.find((user: User) => user.login === login);
    if (findUser) {
      setError({ ...error, isError: true, label: "Login exists" });
      dispatch(logIn({ login, password }));

      if (findUser.pass === password) {
        return navigate("/tasks");
      } else {
        setError({ ...error, isError: true, label: "Password incorrect" });
      }
    } else {
      setLogin("");
      setPassword("");
      setError({ ...error, label: "User registered" });
      dispatch(addUser({ login, password }));
    }
  }

  React.useEffect(() => {
    if (login) {
      setError({ ...error, isRegister: false, isError: false, label: "" });
    }
  }, [login]);
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
              value={login}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLogin(e.target.value)
              }
              className={error.isError ? "input_error" : ""}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              className={error.isError ? "input_error" : ""}
            />
            {error.label && login && (
              <span
                style={{
                  margin: "-22px 0 20px 0",
                  color: error.isError ? "red" : "green",
                }}
              >
                <b>{error.label}</b>
              </span>
            )}
            <button
              disabled={login && password ? false : true}
              className="btn"
              onClick={() => auth()}
            >
              Login/Sign in
            </button>
          </div>
        </div>
      </main>
    </>
  );
};
export default Login;

import React, { useEffect, useState } from "react";
import Login from "./components/Login/Login";
import Task from "./components/Tasks/Tasks";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useTypedSelector, useAppDispatch } from "./redux/hooks/hooks";
import { checkLogin } from "./redux/slices/userSlice";

function App() {
  if (localStorage.users === undefined) {
    localStorage.users = JSON.stringify([]);
  }
  if (localStorage.tasks === undefined) {
    localStorage.tasks = JSON.stringify([]);
  }
  const user = useTypedSelector((state) => state.users);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user.status === "success" || localStorage.login ? (
              <Navigate to="/tasks" replace />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/tasks"
          element={
            <PrivateRoute status={user.status}>
              <Task />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
interface Props {
  children: JSX.Element;
  status: string;
}

const PrivateRoute: React.FC<Props> = ({ children, status }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkLogin());
  }, [status]);

  if (status === "pending") {
    return <Navigate to={"/"} />;
  }

  return status === "success" && children;
};

export default App;

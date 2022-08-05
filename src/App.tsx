import React from "react";
import Login from "./components/Login/Login";
import Task from "./components/Tasks/Tasks";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tasks" element={<Task />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import Header from "../Layout/Header/Header";
import "../Tasks/styles.scss";
import userImg from "../../assets/images/user-icon.jpg";
import { useNavigate } from "react-router-dom";
import { useTypedSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { logOut } from "../../redux/slices/userSlice";
const Task: React.FC = () => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const state = useTypedSelector((state) => state.users);
  console.log(state);
  const arr = [
    {
      id: 0,
      label: "Fix an ability to display all tasks",
      checked: false,
    },
    {
      id: 1,
      label: "Fix a layout, checkboxes should be listed in a column",
      checked: false,
    },
    {
      id: 3,
      label: "Fix a layout, checkboxes should be listed in a column",
      checked: false,
    },
  ];
  function signOut() {
    dispatch(logOut());
    navigate("/");
  }
  return (
    <>
      <Header />

      <main className="main_task">
        <div className="user_block">
          <div className="user_block_image">
            <img src={userImg} width="200px"></img>
          </div>
          <div className="user_block_name">{localStorage.login}</div>
          <button className="signout_btn" onClick={() => signOut()}>
            Sign out
          </button>
        </div>
        <div className="task_block">
          <div className="task_information">
            <h1>My tasks</h1>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <svg
                className="task_inf_svg"
                width={25}
                height={25}
                stroke="black"
                strokeWidth="3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 195.055 195.055"
              >
                <g fill="#010002">
                  <path d="m33.138 94.882 40.649-40.637-3.74-3.744-47.022 47.026 47.022 47.023 3.74-3.737-40.649-40.648h133.699v-5.283z" />
                  <path d="M97.529 0C43.753 0 .005 43.751.005 97.531c0 53.769 43.748 97.524 97.524 97.524s97.52-43.755 97.52-97.524C195.049 43.751 151.305 0 97.529 0zm0 190.441c-51.231 0-92.914-41.679-92.914-92.911 0-51.242 41.683-92.925 92.914-92.925 51.228 0 92.914 41.683 92.914 92.921 0 51.233-41.686 92.915-92.914 92.915z" />
                </g>
              </svg>
              <h2 style={{ margin: 10 }}>Data</h2>
              <svg
                width={25}
                height={25}
                stroke="black"
                strokeWidth="3"
                className="task_inf_svg"
                style={{ transform: "rotate(0.5turn)" }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 195.055 195.055"
              >
                <g fill="#010002">
                  <path d="m33.138 94.882 40.649-40.637-3.74-3.744-47.022 47.026 47.022 47.023 3.74-3.737-40.649-40.648h133.699v-5.283z" />
                  <path d="M97.529 0C43.753 0 .005 43.751.005 97.531c0 53.769 43.748 97.524 97.524 97.524s97.52-43.755 97.52-97.524C195.049 43.751 151.305 0 97.529 0zm0 190.441c-51.231 0-92.914-41.679-92.914-92.911 0-51.242 41.683-92.925 92.914-92.925 51.228 0 92.914 41.683 92.914 92.921 0 51.233-41.686 92.915-92.914 92.915z" />
                </g>
              </svg>
            </div>
          </div>
          <hr className="hr_task" />
          <div className="task">
            {arr.map((task, index) => (
              <span key={task.id} className="task_item">
                <input className="task_check" type="checkbox"></input>
                <strong
                  style={{ marginLeft: 10, textDecorationLine: "line-through" }}
                >
                  {task.label}
                </strong>
                <button className="task_btn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path d="M14 3a1 1 0 0 1 0 2h-.154l-.704 9.153A2 2 0 0 1 11.148 16H4.852a2 2 0 0 1-1.994-1.847L2.154 5H2a1 1 0 1 1 0-2h3V2A2 2 0 0 1 6.85.005L7 0h2a2 2 0 0 1 1.995 1.85L11 2v1h3Zm-2.16 2H4.159l.693 9h6.296l.692-9ZM9 2H7v1h2V2Z" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
          <button className="button_add">Add new task...</button>
        </div>
      </main>
    </>
  );
};
export default Task;

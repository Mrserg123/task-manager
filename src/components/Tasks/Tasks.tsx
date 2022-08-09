import React, { useState } from "react";
import Header from "../Layout/Header/Header";
import "../Tasks/styles.scss";
import userImg from "../../assets/images/user-icon.jpg";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../../redux/hooks/hooks";
import { logOut } from "../../redux/slices/userSlice";
import Modal from "../Modal/Modal";
import { delTask, getAllTasks, taskDone } from "../../redux/slices/taskSlice";

interface Tasks {
  login: string;
  date: string;
  id: number;
  checked: boolean;
  description: string;
}

const Task: React.FC = () => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isModal, setIsModal] = React.useState(false);
  const allTasksParse: any = JSON.parse(localStorage.tasks);
  let date: Date = new Date();
  const stateTasks = useTypedSelector((state) => state.tasks);
  const [count, setCount] = React.useState(0);
  const login = localStorage.login;

  let newDate = new Date(
    date.setDate(date.getDate() - count)
  ).toLocaleDateString();

  function signOut() {
    dispatch(logOut());
    navigate("/");
  }

  function taskChecked(id: number) {
    dispatch(taskDone({ id, tasks: allTasksParse }));
  }

  React.useEffect(() => {
    dispatch(getAllTasks(allTasksParse));
  }, [count]);

  let tasksFilter = stateTasks.allTasks.filter(
    (item: Tasks) => item.login === login && item.date === newDate
  );

  return (
    <>
      <Header />
      {isModal && <Modal close={setIsModal} date={newDate} />}
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
                onClick={() => {
                  setCount((prev) => prev + 1);
                }}
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
              <h2 style={{ margin: 10 }}>{newDate}</h2>
              <svg
                onClick={() => {
                  setCount((prev) => prev - 1);
                }}
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
          {tasksFilter.length !== 0 ? (
            <div className="task">
              {tasksFilter.map((task: Tasks) => (
                <span key={task.id} className="task_item">
                  <input
                    className="task_check"
                    type="checkbox"
                    checked={task.checked}
                    onChange={() => taskChecked(task.id)}
                  ></input>
                  <strong
                    style={{
                      marginLeft: 10,
                      textDecorationLine: task.checked ? "line-through" : "",
                    }}
                  >
                    {task.description}
                  </strong>
                  <button
                    className="task_btn"
                    onClick={() => dispatch(delTask({ id: task.id }))}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                      <path d="M14 3a1 1 0 0 1 0 2h-.154l-.704 9.153A2 2 0 0 1 11.148 16H4.852a2 2 0 0 1-1.994-1.847L2.154 5H2a1 1 0 1 1 0-2h3V2A2 2 0 0 1 6.85.005L7 0h2a2 2 0 0 1 1.995 1.85L11 2v1h3Zm-2.16 2H4.159l.693 9h6.296l.692-9ZM9 2H7v1h2V2Z" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <h2>Tasks not found :(</h2>
          )}
          <button className="button_add" onClick={() => setIsModal(true)}>
            Add new task...
          </button>
        </div>
      </main>
    </>
  );
};
export default Task;

import { createSlice } from "@reduxjs/toolkit";

export interface TaskState {
  date: string;
  description: string;
  login: string;
  checked: boolean;
  id: number;
}
interface AllTask {
  allTasks: Array<object>;
}

const initialState: AllTask = {
  allTasks: [],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      const date = action.payload.date;
      const description = action.payload.description;
      const login = action.payload.login;
      const checked = false;
      const id = tasks[tasks.length - 1] ? tasks[tasks.length - 1].id + 1 : 1;
      localStorage.setItem(
        "tasks",
        JSON.stringify([...tasks, { date, description, login, checked, id }])
      );
      state.allTasks = [
        ...state.allTasks,
        { date, description, login, checked, id },
      ];
    },
    delTask: (state, action) => {
      let id = action.payload.id;
      let result = state.allTasks.filter((item: TaskState) => item.id !== id);
      localStorage.tasks = JSON.stringify(result);
      state.allTasks = result;
    },
    getAllTasks: (state, action) => {
      let tasks = action.payload;
      state.allTasks = tasks;
    },
    taskDone: (state, action) => {
      let tasks = action.payload.tasks;
      let id = action.payload.id;
      let result = tasks.map((item: TaskState) => {
        if (item.id === id) {
          item.checked = !item.checked;
          return item;
        } else {
          return item;
        }
      });
      localStorage.tasks = JSON.stringify(result);
      state.allTasks = tasks.filter(
        (task: any) => task.login === localStorage.login
      );
    },
  },
});

export const { addTask, delTask, getAllTasks, taskDone } = taskSlice.actions;

export default taskSlice.reducer;

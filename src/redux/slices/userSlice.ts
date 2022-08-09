import { createSlice } from "@reduxjs/toolkit";

export interface userState {
  login: string;
  pass: string;
  status: string;
}

const initialState: userState = {
  login: "",
  pass: "",
  status: "pending",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      let users = JSON.parse(localStorage.getItem("users"));
      const login = action.payload.login;
      const pass = action.payload.password;
      let findUser = users.find(
        (item: { login: string }) => item.login === login
      );
      if (!findUser) {
        localStorage.setItem(
          "users",
          JSON.stringify([...users, { login, pass }])
        );
      }
    },
    logOut: (state) => {
      localStorage.removeItem("login");
      state.status = "logOut";
    },
    checkLogin: (state) => {
      let users = JSON.parse(localStorage.getItem("users"));
      if (localStorage.login !== undefined) {
        let findUser = users.find(
          (item: { login: string }) => item.login === localStorage.login
        );
        if (findUser) {
          state.status = "success";
        } else {
          state.status = "logOut";
        }
      }
    },
    logIn: (state, action) => {
      let users = JSON.parse(localStorage.getItem("users"));
      const login = action.payload.login;
      const pass = action.payload.password;
      let findUser = users.find(
        (item: { login: string }) => item.login === login
      );
      if (findUser.pass === pass) {
        localStorage.setItem("login", login);
        state.login = login;
        state.pass = pass;
        state.status = "success";
      }
    },
  },
});

export const { addUser, logIn, logOut, checkLogin } = userSlice.actions;

export default userSlice.reducer;

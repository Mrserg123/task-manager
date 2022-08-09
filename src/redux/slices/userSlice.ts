import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { store } from "../store";

export interface userState {
  login: string;
  pass: string;
  status: string;
}

const initialState: userState = {
  login: "",
  pass: "",
  status: 'pending',
};

// export const getAllCity = createAsyncThunk(
//   "weatherSlice/getAllCity",
//   async (nameCity: Array<string>) => {
//     let requests = nameCity.map((name) =>
//       fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.REACT_APP_WEATHER_API}&units=metric`
//       )
//     );
//     return Promise.all(requests).then((responses) =>
//       Promise.all(responses.map((item) => item.json()))
//     );
//   }
// );
// export const getOneCity = createAsyncThunk(
//   "weatherSlice/getOneCity",
//   async (nameCity: string) => {
//     let requests = await fetch(
//       `https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&appid=${process.env.REACT_APP_WEATHER_API}&units=metric`
//     )
//       .then((responses) => responses.json())
//       .then((result) => result);
//     return requests;
//   }
// );
// export const addCity = createAsyncThunk(
//   "weatherSlice/getAddCity",
//   async (nameCity: string) => {
//     let requests = await fetch(
//       `https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&appid=${process.env.REACT_APP_WEATHER_API}&units=metric`
//     )
//       .then((responses) => responses.json())
//       .then((result) => result);
//     return requests;
//   }
// );

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      let users = JSON.parse(localStorage.getItem("users"));
      const login = action.payload.login;
      const pass = action.payload.password;
      console.log("addUSERRRRRRRRRRRR");
      let findUser = users.find(
        (item: { login: string }) => item.login === login
      );
      if (!findUser) {
        localStorage.setItem("login", login);
        localStorage.setItem(
          "users",
          JSON.stringify([...users, { login, pass }])
        );
      }
    },
    logOut: (state) => {
      localStorage.removeItem("login");
      state.status = 'logOut';
     
    },
    checkLogin: (state) => {
      let users = JSON.parse(localStorage.getItem("users"));
console.log('check')
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
      if (findUser.pass===pass) {
        localStorage.setItem("login", login);
        state.login = login;
        state.pass = pass;
        state.status = 'success';
        console.log(state);
      }
    },
  },

  // extraReducers: (builder) => {
  //   builder.addCase(getAllCity.pending, (state) => {
  //     state.status = "pending";
  //   }),
  //     builder.addCase(getAllCity.rejected, (state) => {
  //       state.status = "rejected";
  //     });
  //   builder.addCase(getAllCity.fulfilled, (state, action) => {
  //     state.status = "fulfilled";
  //     state.allCity = action.payload;
  //   });

  // },
});

export const { addUser, logIn, logOut, checkLogin } = userSlice.actions;

export default userSlice.reducer;

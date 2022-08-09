import { combineReducers } from "redux";
import taskSlice from "../slices/taskSlice";
import userSlice from "../slices/userSlice";

const reducers = combineReducers({
  users: userSlice,
  tasks: taskSlice,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;

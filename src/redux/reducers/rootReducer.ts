import { combineReducers } from 'redux';
import userSlice from '../slices/userSlice';

const reducers = combineReducers({
users: userSlice
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
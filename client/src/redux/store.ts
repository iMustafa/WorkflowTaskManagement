import {createStore} from "redux";
import rootReducer from "./reducers";

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;

export type RootDispatch = typeof store.dispatch;

export default store;

import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";
import EventReducer from "./EventSlice";
import myEventReducer from "./JoinEventSlice";
const store = configureStore({
  reducer: {
    Auth: AuthReducer,
    Events: EventReducer,
    myEvent: myEventReducer,
  },
});

export default store;

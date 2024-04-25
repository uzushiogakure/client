import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/user/userSlice";
import { roomReducer } from "./features/room/roomSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    rooms: roomReducer,
  },
});

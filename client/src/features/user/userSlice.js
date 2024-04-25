import { serverRequest } from "../../utils/axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLogIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logInUser: (state) => {
      state.isLogIn = true;
    },
    logOutUser: (state) => {
      state.isLogIn = false;
    },
    stateUser: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { logInUser, logOutUser, stateUser } = userSlice.actions;

export function login(body) {
  return async (dispatch) => {
    try {
      const { data } = await serverRequest.post("/login", body, {});
      dispatch(stateUser(data.data));
      dispatch(logInUser());
      localStorage.setItem("access_token", data.access_token);
    } catch (error) {
      console.log(error);
    }
  };
}

export function register(body) {
  return async () => {
    try {
      await serverRequest.post("/register", body, {});
    } catch (error) {
      console.log(error);
    }
  };
}

export const userReducer = userSlice.reducer;

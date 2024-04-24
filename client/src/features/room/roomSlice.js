import { serverRequest } from "../../utils/axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    stateRoom: (state, { payload }) => {
      state.data = payload;
    },
  },
});

export const { stateRoom } = roomSlice.actions;

export function fetchAllRoom() {
  return async (dispatch) => {
    try {
      const { data } = await serverRequest.get("/room", {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("access_token"),
        },
      });
      dispatch(stateRoom(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchRoomChat(id) {
  return async (dispatch) => {
    try {
      const { data } = await serverRequest.get("/chat-room/" + id, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("access_token"),
        },
      });
      dispatch(stateRoom(data.Chats));
    } catch (error) {
      console.log(error);
    }
  };
}

export const roomReducer = roomSlice.reducer;

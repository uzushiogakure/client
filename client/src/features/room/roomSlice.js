import { serverRequest } from "../../utils/axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatRoom: [],
  listRoom: [],
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    stateChatRoom: (state, { payload }) => {
      state.chatRoom = payload;
    },
    stateListRoom: (state, { payload }) => {
      state.listRoom = payload;
    },
  },
});

export const { stateChatRoom, stateListRoom } = roomSlice.actions;

export function fetchAllRoom() {
  return async (dispatch) => {
    try {
      const { data } = await serverRequest.get("/room", {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("access_token"),
        },
      });
      dispatch(stateListRoom(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchRoomChat(id) {
  return async (dispatch) => {
    try {
      const { data } = await serverRequest.get("/room/" + id, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("access_token"),
        },
      });
      dispatch(stateChatRoom(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export const roomReducer = roomSlice.reducer;

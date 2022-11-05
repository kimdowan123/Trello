import { createSlice } from "@reduxjs/toolkit";

export const userInformation = createSlice({
  name: "userInformation",
  initialState: { userName: "", userID: "", userProfile: "" },
  reducers: {
    setUserInformation(state, param) {
      state.userName = param.payload.name;
      state.userID = param.payload.id;
      state.userProfile = param.payload.ProfileUrl;
    },
  },
});

export let { setUserInformation } = userInformation.actions;

export default userInformation.reducer;

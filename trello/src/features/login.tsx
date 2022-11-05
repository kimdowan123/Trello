import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: { login: false },
  reducers: {
    loginSuccess(state) {
      state.login = true;
    },
    loginFail(state) {
      state.login = false;
    },
  },
});

export let { loginSuccess, loginFail } = loginSlice.actions;

export default loginSlice.reducer;

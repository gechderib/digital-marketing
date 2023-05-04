import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const signupUrl = "http://localhost:5000/api/dmfsse/signup";

const initialState = { status: "idle", error: null };
// idle | loading | succeeded | failed

export const addNewUser = createAsyncThunk(
  "signup/addNewUser",
  async (initialData) => {
    try {
      const response = await axios.post(signupUrl, initialData);
      return response.data;
    } catch (err) {
      return err.code;
    }
  }
);

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(addNewUser.fulfilled, (state, action) => {
      // console.log(action)
      state.status = "succeeded";
    });
  },
});

// export const {} = signupSlice.actions;
export const getSignupStatus = (state) => state.users.status;
export const getSignupError = (state) => state.users.error;

export default signupSlice.reducer;

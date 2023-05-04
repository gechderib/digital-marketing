import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const loginUrl = "http://localhost:5000/api/dmfsse/signin"
const initialState = { status: "idle", error: null };



export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (initialData) => {
    console.log(initialData)
    try{
        const response = await axios.post(loginUrl, initialData)
        return response.data
    }catch(err){
        return err.code
    }
  }
);


const loginSlice = createSlice({
    name:"login",
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(loginUser.fulfilled, (state, action)=>{
          state.status = "succeeded"
        })
    }
})



export default loginSlice.reducer

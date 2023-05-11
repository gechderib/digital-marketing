import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const mainUrl = "https://digital-marketing-for-farmers-and-sse.onrender.com/api/dmfsse"
const localurl = "http://localhost:5000/api/dmfsse";

const initialState = { status: "idle", error: null };



export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (initialData) => {
    console.log(initialData)
    try{
        const response = await axios.post(`${mainUrl}/signin`, initialData)
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

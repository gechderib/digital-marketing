import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const mainUrl =
  "https://digital-marketing-for-farmers-and-sse.onrender.com/api/dmfsse";
const localUrl = "http://localhost:5000/api/dmfsse";

const initialState = {
  users: [],
  farmers:[],
  user: {},
  userDetail: {},
  status: "idle",
  error: null,
  updateStatus:"idle",
  changePass:false
};
// idle | loading | succeeded | failed

export const addNewUser = createAsyncThunk(
  "signup/addNewUser",
  async (initialData) => {
    try {
      const response = await axios.post(`${mainUrl}/signup`, initialData);
      return response.data;
    } catch (err) {
      return err.code;
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ initalData, token }) => {
    try {
      const response = await axios.post(`${mainUrl}/register`, initalData, {
        headers: {
          "content-type": "application/json",
          "x-access-token": `${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return err.code;
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async ({ token}) => {
    try {
      
      const response = await axios.get(`${mainUrl}/users`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${token}`,
        },
      });
      
      return response.data;
    } catch (err) {
      return err.code;
    }
  }
);

export const getAllFarmers = createAsyncThunk(
  "user/getAllFarmers",
  async ({ token}) => {
    try {
      
      const response = await axios.get(`${mainUrl}/allFarmers`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${token}`,
        },
      });
      console.log(response)
      return response.data;
    } catch (err) {
      return err.code;
    }
  }
);

export const getOneUser = createAsyncThunk("product/getOneUser", async (id) => {
  try {
    const response = await axios.get(`${mainUrl}/user/${id}`);
    return response.data;
  } catch (err) {
    return err.code;
  }
});

export const deleteUser = createAsyncThunk(
  "product/deleteUser",
  async ({ id, token }) => {
    try {
      const response = await axios.delete(`${mainUrl}/user/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return err.code;
    }
  }
);

export const updateUser = createAsyncThunk(
  "product/updateUser",
  async ({ newData, id, token }) => {
    try {
      const response = await axios.patch(`${mainUrl}/user/${id}`, newData, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${token}`,
        },
      });
      console.log(response.data)
      return response.data;
    } catch (err) {
      return err.code;
    }
  }
);

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    addUserDetail(state, action) {
      state.userDetail = action.payload;
    },
    toggleChangePass(state, action) {
      state.changePass = !state.changePass
    }
  },
  extraReducers(builder) {
    builder
      .addCase(addNewUser.fulfilled, (state, action) => {
        // console.log(action)
        state.status = "succeeded";
      })
      .addCase(getAllUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })

      .addCase(getAllFarmers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllFarmers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getAllFarmers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.farmers = action.payload;
      })



      .addCase(registerUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.users.push(action.payload.data);
      })
      .addCase(getOneUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getOneUser.rejected, (state, action) => {
        state.status = "failed";
        state.err = action.payload;
      })
      .addCase(getOneUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (user) => user._id != state.userDetail._id
        );
      })
      .addCase(updateUser.pending, (state, action) => {
        state.updateStatus = "loading"
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        
        state.users = state.users.filter(
          (user) => user._id !== action.payload.data._id
        );
        const data = {
          _id: `${action.payload.data._id}`,
          firstName: `${action.payload.data.firstName}`,
          email:`${action.payload.data.email}`,
          lastName: `${action.payload.data.lastName}`,
          password: `${action.payload.data.password}`,
          phoneNumber: `${action.payload.data.phoneNumber}`,
          roles: [`${action.payload.data.roles}`],
          createdAt:`${action.payload.data.createdAt}`,
          identifictionPicture: `${action.payload.data.identifictionPicture}`,
          profilePicture: `${action.payload.data.profilePicture}`,
          verified: `${action.payload.data.verified}`

        };
        state.updateStatus = "succeeded"
        state.users.push(data);
      });
  },
});

export const getSignupStatus = (state) => state.users.status;
export const getSignupError = (state) => state.users.error;
export const updateStat = (state) => state.users.updateStatus
export const allUsers = (state) => state.users.users;
export const allFarmers = (state) => state.users.farmers
export const registerStatus = (state) => state.users.status;
export const registerError = (state) => state.users.error;
export const userDetail = (state) => state.users.userDetail;
export const changePass = (state) => state.users.changePass

export const { addUserDetail, toggleChangePass } = signupSlice.actions;

export default signupSlice.reducer;

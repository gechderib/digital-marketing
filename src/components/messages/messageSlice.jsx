import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));
const mainUrl =
  "https://digital-marketing-for-farmers-and-sse.onrender.com/api/dmfsse";
const localUrl = "http://localhost:5000/api/dmfsse";

const initialState = {
  messages: [],
  oneUserMessage: [],
  message: {},
  messaageDetail: {},
  status: "idle", // loading, success, failed
  error: null,
  connectedUserStatus:"idle",
  connectedUsers:[]
};

export const addNewMessage = createAsyncThunk(
  "message/addNewMessage",
  async ({ initalData, id, token }) => {
    try {
      const response = await axios.post(
        `${mainUrl}/message/${id}`,
        initalData,
        {
          headers: {
            "content-type": "application/json",
            "x-access-token": `${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return err.code;
    }
  }
);

export const getAllMessages = createAsyncThunk(
  "message/getAllMessage",
  async () => {
    try {
      const response = await axios.get(`${mainUrl}/messages`, {
        headers: {
          "Content-Type": "application/json",
          
        },
      });

      return response.data;
    } catch (err) {
      return err.code;
    }
  }
);

export const getOneMessage = createAsyncThunk(
  "message/getOneMessage",
  async (id) => {
    try {
      const response = await axios.get(`${mainUrl}/message/${id}`);
      return response.data;
    } catch (err) {
      return err.code;
    }
  }
);

export const getYourMessage = createAsyncThunk(
  "message/getYourMessage",
  async ({id, token}) => {
    console.log("pppppppppppppppppppp")
    try { 
      const response = await axios.get(`${mainUrl}/getYourMessage/${id}`,{
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${token}`,
        },
      });
      console.log("kkkkkkkkkkkkkkkkkkk")
      console.log(response)
      return response.data;
    } catch (err) {
      console.log(err)
      return err.code;
    }
  }
);

export const getConnectedUser = createAsyncThunk(
  "message/getConnectedUser",
  async ({token}) => {
    try {
      const response = await axios.get(`${mainUrl}/connectedUserList`,{
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

export const deleteMessage = createAsyncThunk(
  "message/deleteMessage",
  async ({ id, token }) => {
    try {
      const response = await axios.delete(`${mainUrl}/message/${id}`, {
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

export const updateMessage = createAsyncThunk(
  "message/updateMessage",
  async ({ newData, id, token }) => {
    try {
      const response = await axios.patch(`${mainUrl}/message/${id}`, newData, {
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

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessageDetail(state, action) {
      state.messageDetail = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllMessages.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getAllMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.messages = action.payload;
      })
      .addCase(addNewMessage.fulfilled, (state, action) => {
        state.oneUserMessage.push({
          ...action.payload,
        });
      })
      .addCase(getYourMessage.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getYourMessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getYourMessage.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action);
        state.oneUserMessage = action.payload;
      }).addCase(getConnectedUser.pending, (state, action)=> {
        state.connectedUserStatus = "loading"
      }).addCase(getConnectedUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
      }).addCase(getConnectedUser.fulfilled, (state, action) => {
        state.connectedUserStatus = "succeeded"
        state.connectedUsers = action.payload
      })

      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.oneUserMessage = state.oneUserMessage.filter(
          (message) => message._id != state.messageDetail._id
        );
      })
      .addCase(updateMessage.fulfilled, (state, action) => {
        state.oneUserMessage = state.oneUserMessage.filter(
          (product) => product._id !== action.payload.data._id
        );
        const data = {
          _id: `${action.payload._id}`,

        };

        state.oneUserMessage.push(data);
      });
  },
});

export const connectedUserStatus = (state) => state.messages.connectedUserStatus;
export const connectedUser = (state) => state.messages.connectedUsers;
export const messageFromOneUser = (state) => state.messages.oneUserMessage;
export const messageStatus = (state) => state.messages.status;
export const messageError = (state) => state.messages.error;
export const messageDetail = (state) => state.messages.messageDetail;

export const { addMessageDetail } = messageSlice.actions;
export default messageSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));
console.log(user)
const mainUrl = "https://digital-marketing-for-farmers-and-sse.onrender.com/api/dmfsse";
const localUrl = "http://localhost:5000/api/dmfsse";
var initialState = {
  trainings: [],
  searchedTrainings:[],
  isTrainingSearching:false,
  training: {},
  detailData:{},
  status: "idle", // loading | failed | succeeded
  error: null,
  page:0
};

export const addNewTraining = createAsyncThunk(
  "training/addNewTraining",
  async ({ initalData, token }) => {
    try {
      const response = await axios.post(`${mainUrl}/addTraining`, initalData, {
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

export const getAllTrainings = createAsyncThunk(
  "training/getAllTraining",
  async ({ token, page = 0 }) => {
    try {
      const response = await axios.get(`${mainUrl}/trainings?p=${page}`, {
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

export const getOneTraining = createAsyncThunk(
  "training/getOneTraining",
  async ({id, token}) => {
    try {
      const response = await axios.get(`${mainUrl}/training/${id}`,{
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

export const deleteTraining = createAsyncThunk(
  "training/deleteTraining",
  async ({ id, token }) => {
    try {
      const response = await axios.delete(`${mainUrl}/training/${id}`, {
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

export const updateTraining = createAsyncThunk(
  "training/updateTraining",
  async ({ newData, id, token }) => {
    try {
      const response = await axios.patch(`${mainUrl}/training/${id}`, newData, {
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

const trainingSlice = createSlice({
  name: "training",
  initialState,
  reducers: {
    addDetailData(state, action){
      state.detailData = action.payload
    },
    changePage(state, action) {
      state.page = action.payload
    },
    onSearchTraining(state, action) {
      state.searchedTrainings = state.trainings.filter(training => training.title.toLowerCase().includes(action.payload.toLowerCase()))
    },
    setIsTrainingSearching(state, action) {
      state.isTrainingSearching = action.payload
    }
  },

  extraReducers(builder) {
    builder
      .addCase(getAllTrainings.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllTrainings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getAllTrainings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.trainings = action.payload;
        state.searchedTrainings = action.payload;
      })
      .addCase(addNewTraining.fulfilled, (state, action) => {
        state.trainings.push({
          ...action.payload,
          postedBy: { firstName: user.firstName, lastName: user.lastName },
        });
      })
      .addCase(getOneTraining.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getOneTraining.rejected, (state, action) => {
        state.state = "failed";
        state.err = action.payload;
      })
      .addCase(getOneTraining.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detailData = action.payload[0]
        state.training = action.payload;
      })
      .addCase(deleteTraining.fulfilled, (state, action) => {
        state.trainings = state.trainings.filter(
          (training) => training._id != action.payload.id
        );
      })
      .addCase(updateTraining.fulfilled, (state, action) => {
        state.trainings = state.trainings.filter(
          (training) => training._id !== action.payload.id
        );
        const data = {
          _id:`${action.payload.id}`,
          title:`${action.payload.data.title}`,
          description:`${action.payload.data.description}`,
          mediaFile:`${action.payload.data.mediaFile}`,
          postedBy: {firstName:`${user.firstName}`, lastName:`${user.lastName}`},
          createdAt:`${action.payload.data.createdAt}`
        }
        
        state.trainings.push(data);
        console.log(action.payload);
      });
  },
});

export const allTrainings = (state) => state.trainings.trainings;
export const oneTraining = (state) => state.trainings.training;
export const trainingStatus = (state) => state.trainings.status;
export const trainingError = (state) => state.trainings.error;
export const trainingDetail = (state) => state.trainings.detailData
export const pagination = (state) => state.trainings.page
export const isTrainingSearching = (state) => state.trainings.isTrainingSearching
export const searchedTraining = (state) => state.trainings.searchedTrainings;
export const {addDetailData, changePage, onSearchTraining, setIsTrainingSearching} = trainingSlice.actions
export default trainingSlice.reducer;

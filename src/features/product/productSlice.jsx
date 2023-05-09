import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const mainUrl = "https://digital-marketing-for-farmers-and-sse.onrender.com/api/dmfsse";
const initialState = {
  products: [],
  detailData:{},
  status: "idle", // loading, success, failed
  error: null,
};

export const addNewProduct = createAsyncThunk(
  "product/addNewProduct",
  async ({ initalData, token }) => {
    try {
      const response = await axios.post(`${mainUrl}/addProduct`, initalData, {
        headers: {
          "content-type": "application/json",
          "x-access-token": `${token}`,
        },

      });
      console.log("popopo")
      return response.data;
    } catch (err) {
      return err.code;
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "product/getAllProduct",
  async ({ token, page = 0 }) => {
    try {
      const response = await axios.get(`${mainUrl}/products?p=${page}`, {
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
  async (id) => {
    try {
      const response = await axios.get(`${mainUrl}/training/${id}`);
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

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addDetailData(state, action) {
      state.detailData = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload)
        state.products = action.payload;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.products.push({
          ...action.payload,
          postedBy: { firstName: user.firstName, lastName: user.lastName },
        });
      })
      .addCase(getOneTraining.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getOneTraining.rejected, (state, action) => {
        state.status = "failed";
        state.err = action.payload;
      })
      .addCase(getOneTraining.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.training = action.payload;
      })
      .addCase(deleteTraining.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id != action.payload.id
        );
      })
      .addCase(updateTraining.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.payload.id
        );
        const data = {
          id: `${action.payload.id}`,
          title: `${action.payload.data.title}`,
          description: `${action.payload.data.description}`,
          mediaFile: `${action.payload.data.mediaFile}`,
          postedBy: {
            firstName: `${user.firstName}`,
            lastName: `${user.lastName}`,
          },
          createdAt: `${action.payload.data.createdAt}`,
        };

        state.trainings.push(data);
        console.log(action.payload);
      });
  },
});


export const allProducts = (state) => state.products.products;
export const productStatus = (state) => state.products.status;
export const productError = (state) => state.products.error;
export const productDetail = (state) => state.products.detailData

export const {addDetailData} = productSlice.actions
export default productSlice.reducer;
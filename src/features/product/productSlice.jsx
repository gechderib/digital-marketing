import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"))
const mainUrl = "https://digital-marketing-for-farmers-and-sse.onrender.com/api/dmfsse";
const localUrl = "http://localhost:5000/api/dmfsse";

const initialState = {
  products: [],
  searchedProducts:[],
  isProductSearching:false,
  product:{},
  detailData:{},
  status: "idle", // loading, success, failed
  error: null,
  myproducts: [],
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
  async ({ page = 0 }) => {
    try {
      const response = await axios.get(`${mainUrl}/products?p=${page}`, {
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

export const getMyProducts = createAsyncThunk(
  "product/getMyproducts",
  async ({token}) => {
    try {
      const response = await axios.get(`${mainUrl}/myProduct`, {
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

export const getOneProduct = createAsyncThunk(
  "product/getOneProduct",
  async (id) => {
    try {
      const response = await axios.get(`${mainUrl}/product/${id}`);
      
      return response.data;
      
    } catch (err) {
      return err.code;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async ({ id, token }) => {
    try {
      const response = await axios.delete(`${mainUrl}/product/${id}`, {
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

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ newData, id, token }) => {
    try {
      const response = await axios.patch(`${mainUrl}/product/${id}`, newData, {
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
    addProductDetail(state, action) {
      state.detailData = action.payload;
    },
    onSearchProduct(state, action) {
      state.searchedProducts = state.products.filter(product => product.name.toLowerCase().includes(action.payload.toLowerCase()))
    },
    setIsProductSearching(state, action) {
      state.isProductSearching = action.payload
    }
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
        state.searchedProducts = action.payload
      })      .addCase(getMyProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getMyProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getMyProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload)
        state.myproducts = action.payload;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.products.push({
          ...action.payload,
          postedBy: { firstName: user.firstName, lastName: user.lastName },
        });
      })
      .addCase(getOneProduct.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getOneProduct.rejected, (state, action) => {
        state.status = "failed";
        state.err = action.payload;
      })
      .addCase(getOneProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detailData = action.payload;
        state.product = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id != state.detailData._id
        );
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.payload.data._id
        );
        const data = {
          _id: `${action.payload.data._id}`,
          name: `${action.payload.data.name}`,
          description: `${action.payload.data.description}`,
          price: `${action.payload.data.price}`,
          amount: `${action.payload.data.amount}`,
          soldout: `${action.payload.data.soldout}`,
          photo: `${action.payload.data.photo}`,
          postedBy: {
            firstName: `${user.firstName}`,
            lastName: `${user.lastName}`,
            phoneNumber: `${user.phoneNumber}`,
            profilePicture: `${user.profilePicture}`,
            roles: `${user.roles}`,
            verified: user.verified
          },
        };

        state.products.push(data);
      });
  },
});


export const allProducts = (state) => state.products.products;
export const productStatus = (state) => state.products.status;
export const productError = (state) => state.products.error;
export const productDetail = (state) => state.products.detailData;
export const searchedproduct = (state) => state.products.searchedProducts;
export const isProductSearching = (state) => state.products.isProductSearching;
export const myProducts = (state) => state.products.myproducts;

export const {addProductDetail, onSearchProduct, setIsProductSearching} = productSlice.actions
export default productSlice.reducer;
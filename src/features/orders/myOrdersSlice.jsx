import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));
const mainUrl =
  "https://digital-marketing-for-farmers-and-sse.onrender.com/api/dmfsse";
const localUrl = "http://localhost:5000/api/dmfsse";

const initialState = {
  orders: [],
  order: {},
  detailData: {},
  status: "idle", // loading, success, failed
  error: null,
  myorders: [],
  myoffers: [],
  offerStat: "idle", // accepting, rejecting
  totalSale: 0,
  todaySession: 0,
};

export const addNewOrder = createAsyncThunk(
  "order/addNewOrder",
  async ({ initalData, token, productId }) => {
    try {
      const response = await axios.post(
        `${mainUrl}/order/${productId}`,
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

export const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async ({ token, page = 0 }) => {
    try {
      const response = await axios.get(`${mainUrl}/orders?p=${page}`, {
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

export const getMyOrders = createAsyncThunk(
  "order/getMyOrders",
  async ({ token }) => {
    try {
      const response = await axios.get(`${mainUrl}/myOrders`, {
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

export const getMyOffers = createAsyncThunk(
  "order/getMyOffers",
  async ({ token }) => {
    try {
      const response = await axios.get(`${mainUrl}/myOffers`, {
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

export const getOneOrder = createAsyncThunk("order/getOneOrder", async ({id, token}) => {
  try {
    const response = await axios.get(`${mainUrl}/order/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${token}`,
      },
    });

    return response.data;
  } catch (err) {
    return err.code;
  }
});

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async ({ id, token }) => {
    try {
      const response = await axios.delete(`${mainUrl}/order/${id}`, {
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

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ newData, id, token }) => {
    try {
      const response = await axios.patch(`${mainUrl}/order/${id}`, newData, {
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

const orderSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addOrderDetail(state, action) {
      state.detailData = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllOrders.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(getMyOrders.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.myorders = action.payload;
      })

      .addCase(getMyOffers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getMyOffers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getMyOffers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.myoffers = action.payload;
      })

      .addCase(addNewOrder.fulfilled, (state, action) => {
        if (
          action.payload != "ERR_BAD_REQUEST" ||
          action.payload == "ERR_NETWORK"
        ) {
          state.myorders.push(...action.payload);
        }
      })
      .addCase(getOneOrder.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getOneOrder.rejected, (state, action) => {
        state.status = "failed";
        state.err = action.payload;
      })
      .addCase(getOneOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detailData = action.payload;
        state.order = action.payload;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.myorders = state.myorders.filter(
          (order) => order._id != state.detailData._id
        );
      })
      .addCase(updateOrder.pending, (state, action) => {
        state.offerStat = "loading";
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        console.log(action);
        console.log(action.payload[0]._id);
        state.myoffers = state.myoffers.filter(
          (order) => order._id != action.payload[0]._id
        );
        state.myoffers.push(action.payload[0]);
        state.offerStat = "idle";
      });
  },
});

export const allOrders = (state) => state.orders.orders;
export const orderStatus = (state) => state.orders.status;
export const orderError = (state) => state.orders.error;
export const orderDetail = (state) => state.orders.detailData;
export const myOrders = (state) => state.orders.myorders;
export const myOffers = (state) => state.orders.myoffers;
export const offerStatus = (state) => state.orders.offerStat;
export const { addOrderDetail } = orderSlice.actions;
export default orderSlice.reducer;

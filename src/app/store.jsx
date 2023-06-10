import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/signup/signupSlice"
import loginReducer from "../features/signup/signupSlice"
import trainingReducer from "../features/training/trainingSlice"
import productReducer from "../features/product/productSlice"
import messageReducer from "../components/messages/messageSlice"
import orderReducer from "../features/orders/myOrdersSlice"
const store = configureStore({
    reducer: {
        users:userReducer,
        login:loginReducer,
        trainings:trainingReducer,
        products: productReducer,
        messages: messageReducer,
        orders: orderReducer
    }
})


export default store;
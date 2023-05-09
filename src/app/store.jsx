import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/signup/signupSlice"
import loginReducer from "../features/signup/signupSlice"
import trainingReducer from "../features/training/trainingSlice"
import productReducer from "../features/product/productSlice"
const store = configureStore({
    reducer: {
        users:userReducer,
        login:loginReducer,
        trainings:trainingReducer,
        products: productReducer
    }
})


export default store;
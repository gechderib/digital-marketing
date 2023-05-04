import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/signup/signupSlice"
import loginReducer from "../features/signup/signupSlice"
const store = configureStore({
    reducer: {
        users:userReducer,
        login:loginReducer
    }
})


export default store;
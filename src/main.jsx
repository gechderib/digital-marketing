import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import { DmfsseContextProvider } from "./app/contextStore";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <DmfsseContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DmfsseContextProvider>
    </Provider>
  </React.StrictMode>
);

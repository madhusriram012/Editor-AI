import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.scss";
import "./config/userWorker";
import { StoreProvider } from "easy-peasy";
import { Store } from "./Store/Store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StoreProvider store={Store}>
    <App />
  </StoreProvider>
);

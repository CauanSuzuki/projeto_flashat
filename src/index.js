import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AllocateProvider } from "./context/allocate";
import {SocketProvider} from "./context/socket.io"

ReactDOM.render(
  <React.StrictMode>
    <AllocateProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </AllocateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

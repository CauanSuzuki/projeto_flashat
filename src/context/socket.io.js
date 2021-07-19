import React, { createContext, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useAllocate } from "./allocate";

const socketContext = createContext();

export function SocketProvider({ children }) {
  const { token, setChat, chat, setToken, setTouch } = useAllocate();

  

  return <socketContext.Provider>{children}</socketContext.Provider>;
}
export function useSocket() {
  const context = useContext(socketContext);
  return context;
}

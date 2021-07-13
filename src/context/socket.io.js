import React, { createContext, useEffect, useContext } from "react";
import { io } from "socket.io-client";

const socketContext = createContext();

export function SocketProvider({ children }) {
  useEffect(() => {
    // const socket = io("http://localhost:3312");

    const socket = io.connect("http://localhost:3312/", {
      transport: ["websocket"],
    });

    socket.on("new-message", (data) => {
     console.log("data socket-->",data)
      alert(data);
    });
  }, []);

  return <socketContext.Provider>{children}</socketContext.Provider>;
}
export function useSocket() {
  const context = useContext(socketContext);
  return context;
}

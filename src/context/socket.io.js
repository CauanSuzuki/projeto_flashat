import React, { createContext, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useAllocate } from "./allocate";

const socketContext = createContext();

export function SocketProvider({ children }) {
  const { token, setChat, chat, setToken, setTouch } = useAllocate();

  useEffect(() => {
    const socket = io.connect("http://localhost:3312/", {
      transport: ["websocket"],
    });

    if (localStorage.getItem("token")) {
      axios
        .get("http://localhost:3312/user/showUser", {
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(function(result) {
          //verificar quando tken é inválido
          setToken({ token: localStorage.getItem("token"), user: result.data });
          setTouch(result.data);

          socket.on("new-message", (data) => {
            console.log(chat)
            if (
              Notification.permission === "granted" &&
              data.userId !== result.data.id
            ) {
              new Notification(data.users.name, {
                body: data.text,
              });
              setChat([...chat, data]);
            }
          });
        });
    }
  }, [chat]);

  return <socketContext.Provider>{children}</socketContext.Provider>;
}
export function useSocket() {
  const context = useContext(socketContext);
  return context;
}

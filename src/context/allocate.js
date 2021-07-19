import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import events from "../emitters/events";

const allocateContext = createContext();

export function AllocateProvider({ children }) {
  const [data, setData] = useState([]);
  const [login, setLogin] = useState([]);
  const [senha, setSenha] = useState([]);
  const [token, setToken] = useState({});
  const [touch, setTouch] = useState([]);
  const [atualizacao, setAtualizacao] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [dadosOtherUser, setdadosOtherUser] = useState([]);
  const [listaConversas, setListaConversas] = useState([]);
  const [chat, setChat] = useState([]);
  const [lastMessage, setLastMessage] = useState([]);

  const [chatAtual, setChatAtual] = useState("");

  useEffect(() => {
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
        });
    }
  }, []);

  useEffect(() => {
    events.on("nova-mensagem", function(data) {
      if (data.chatId === Number(chatAtual)) {
        setChat([...chat, data]);
      }
    });
  }, [chat]);

  return (
    <allocateContext.Provider
      value={{
        data,
        setData,
        senha,
        setSenha,
        login,
        setLogin,
        token,
        setToken,
        touch,
        setTouch,
        atualizacao,
        setAtualizacao,
        pesquisa,
        setPesquisa,
        dadosOtherUser,
        setdadosOtherUser,
        listaConversas,
        setListaConversas,
        chat,
        setChat,
        lastMessage,
        setLastMessage,
        chatAtual,
        setChatAtual,
      }}
    >
      {children}
    </allocateContext.Provider>
  );
}
export function useAllocate() {
  const context = useContext(allocateContext);
  return context;
}

// import { useAllocate } from "../context/allocate";
// const { data, setData } = useAllocate();

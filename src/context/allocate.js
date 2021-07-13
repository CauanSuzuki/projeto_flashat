import React, { createContext, useState, useContext } from "react";
const allocateContext = createContext();

export function AllocateProvider({ children }) {
  const [data, setData] = useState([]);
  const [login, setLogin] = useState([]);
  const [senha, setSenha] = useState([]);
  const [token, setToken] = useState("");
  const [touch, setTouch] = useState([]);
  const [atualizacao, setAtualizacao] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [dadosOtherUser, setdadosOtherUser] = useState([]);
  const [listaConversas, setListaConversas] = useState([]);
  const [chat, setChat] = useState([]);

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
        chat, setChat
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

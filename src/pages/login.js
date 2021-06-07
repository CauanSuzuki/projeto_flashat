import React from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { useAllocate } from "../context/allocate";

function Login({ children }) {
  const { senha, setSenha, login, setLogin, setToken } = useAllocate();

  let history = useHistory();

  const redirectRegister = () => {
    history.push(`/register`);
  };

  function checkIn(login, senha) {
    axios
      .post("http://localhost:3312/user/login", {
        phone: login,
        password: senha,
      })
      .then((resposta) => {
        setToken(resposta.data.token);
        console.log(resposta.data);
        history.push("/");
      });
  }

  return (
    <div className="login">
      {children}
      <hr />
      <input
        placeholder="YOUR NUMBER"
        onChange={(event) => setLogin(event.target.value)}
      />
      <input
        placeholder="PASSWORD"
        onChange={(event) => setSenha(event.target.value)}
      />
      <br></br>
      <button onClick={() => checkIn(login, senha)}>Enviar</button>
      <button onClick={() => redirectRegister()}>Registar</button>
    </div>
  );
}

export default Login;

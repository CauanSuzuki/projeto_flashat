import React, { useState } from "react";
import { Redirect, useHistory } from "react-router";
import axios from "axios";

function Login({ children }) {
  let history = useHistory();

  const [login, setLogin] = useState([]);
  const [senha, setSenha] = useState([]);

 
  const redirectRegister = () => {
    history.push(`/register`);
  };

  function checkIn(login, senha) {
    axios
      .post("http://localhost:3312/user/login", {
        phone: login,
        password: senha,
      })
      .then((resposta) => console.log(resposta.data));
  }
  console.log("login -->",login)
  console.log("senha -->",senha)

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
      <button onClick={() => checkIn(login,senha)}>Enviar</button>
      <button onClick={() => redirectRegister()}>Registar</button>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import { Redirect, useHistory } from "react-router";
import axios from "axios";

function Login({ children }) {
  let history = useHistory();

  const [login, setLogin] = useState([]);
  const [senha, setSenha] = useState([]);

  const redirectList = () => {
    history.push(`/list`);
  };

  function register(phone, password, ) {
    axios
      .post("http://localhost:3312/user/create", {
        phone: phone,
        password: password,
      })
      .then((resposta) => console.log(resposta.data));
  }

  //   function register(phone, name, password, email) {
  //     axios
  //       .post("http://localhost:3312/user/create", {
  //         phone: phone,
  //         name: name,
  //         password: password,
  //         email: email,
  //       })
  //       .then((resposta) => console.log(resposta.data));
  //   }

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

      <button onClick={() => register()}>Enviar</button>
    </div>
  );
}

export default Login;

import React from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { useAllocate } from "../context/allocate";
import {} from "./style.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
        setToken(resposta.data);
        console.log(resposta.data);
        localStorage.setItem("token", resposta.data.token);
        history.push("/");
      });
  }

  return (
    <div className="login">
      <div className="loginFormat">
        {children}

        <div className="loginLogo">
          <img src="https://i.pinimg.com/236x/24/64/c0/2464c0306050f62571dbeb4352a0d8ab.jpg" />
        </div>

        <div className="inputLogin">
          <TextField
            id="standard-basic"
            label="LOGIN"
            placeholder="YOUR NUMBER"
            onChange={(event) => setLogin(event.target.value)}
            data-teste="inputLogin"
          />

          <TextField
            id="standard-basic"
            type="text"
            label="PASSWORD"
            placeholder="PASSWORD"
            format=" (##) #####-####"
            allowEmptyFormatting
            mask="_"
            onChange={(event) => setSenha(event.target.value)}
            data-teste="inputSenha"
          />
        </div>
        <br></br>
        <br></br>
        <div className="loginButtons">
          <Button
            className="loginButtons buttonGetIn"
            variant="outlined"
            size="small"
            color="primary"
            onClick={() => checkIn(login, senha)}
          >
            get in
          </Button>

          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={() => redirectRegister()}
          >
            register
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;

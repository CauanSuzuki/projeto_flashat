import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {} from "./style.css";
import { useAllocate } from "../context/allocate";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

function Cadastro({ children }) {
  const { setToken } = useAllocate();
  const formik = useFormik({
    initialValues: {
      phone: "",
      name: "",
      password: "",
      email: "",
    },
    onSubmit: (value) => {
      reserch(value.phone, value.name, value.password, value.email);
      alert(JSON.stringify(value, null, 2));
    },
  });
  let history = useHistory();
  const classes = useStyles();

  function reserch(phone, name, password, email) {
    axios
      .post("http://localhost:3312/user/create", {
        phone: phone,
        name: name,
        password: password,
        email: email,
      })
      .then((resposta) => {
        setToken(resposta.data);
        localStorage.setItem("token", resposta.data.token);
        history.push("/");
      });
  }

  return (
    <div className="principal">
      {children}
      <div className="register">
        <div className="adicionar">
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="nome"></label>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Upload
              </Button>
            </label>
            <br></br>
            <TextField
              id="phone"
              name="phone"
              label="PHONE"
              type="text"
              placeholder="phone number"
              onChange={formik.handleChange}
              value={formik.values.phone}
              data-teste="inputPhone"
            />
            <br></br>
            <br></br>
            <label htmlFor="name"></label>
            <TextField
              id="name"
              name="name"
              label="NAME"
              type="text"
              placeholder="user name require"
              onChange={formik.handleChange}
              value={formik.values.name}
              data-teste="inputName"
            />
            <br></br>
            <br></br>
            <label htmlFor="password"></label>
            <TextField
              id="password"
              name="password"
              label="PASSWORD"
              type="text"
              placeholder="everything"
              format=" (##) #####-####"
              allowEmptyFormatting
              mask="_"
              onChange={formik.handleChange}
              value={formik.values.password}
              data-teste="inputPassword"
            />
            <br></br>
            <br></br>
            <label htmlFor="email"></label>
            <TextField
              id="email"
              name="email"
              label="EMAIL"
              type="text"
              placeholder="enter an valid email"
              onChange={formik.handleChange}
              value={formik.values.email}
              data-teste="inputEmail"
            />
            <br></br>
            <br></br>
            <Button
              className="registerHome"
              variant="outlined"
              size="small"
              color="primary"
              type="submit"
            >
              Confirm
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;

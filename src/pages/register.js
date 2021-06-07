import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Cadastro({ children }) {
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
  const redirecionarHome = () => {
    history.push("/");
  };
  function reserch(phone, name, password, email) {
    axios
      .post("http://localhost:3312/user/create", {
        phone: phone,
        name: name,
        password: password,
        email: email,
      })
      .then((resposta) => console.log(resposta.data));
  }

  return (
    <div className="principal">
      {children}
      <p>form</p>
      <div className="adicionar">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="nome">phone:</label>
          <input
            id="phone"
            name="phone"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          <br></br>
          <br></br>
          <label htmlFor="name">name:</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <br></br>
          <br></br>
          <label htmlFor="password">password:</label>
          <input
            id="password"
            name="password"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <br></br>
          <br></br>
          <label htmlFor="email">email:</label>
          <input
            id="email"
            name="email"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <br></br>
          <br></br>

          <button type="submit">register</button>
          <button onClick={() => redirecionarHome()}>Home</button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;

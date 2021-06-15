import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {} from "./style.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import MaskedInput from "react-text-mask";
import NumberFormat from "react-number-format";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1),
//     },
//   },
// }));

// function TextMaskCustom(props) {
//   const { inputRef, ...other } = props;

//   return (
//     <NumberFormat
//       {...other}
//       ref={(ref) => {
//         inputRef(ref ? ref.inputElement : null);
//       }}
//       format="(###) #####-####"
//       mask="_"
//     />
//   );
// }

// TextMaskCustom.propTypes = {
//   inputRef: PropTypes.func.isRequired,
// };

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
    history.push("/login");
  };

  // const classes = useStyles();
  // const [values, setValues] = React.useState({
  //   textmask: "(0  )    -    ",
  //   numberformat: "1320",
  // });

  // const handleChange = (event) => {
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.value,
  //   });
  // };

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
      <div className="register">
        <div className="adicionar">
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="nome"></label>
            <TextField
              id="phone"
              name="phone"
              label="PHONE"
              type="text"
              placeholder="phone number"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />

            {/* <div className={classes.root}>
              <InputLabel htmlFor="formatted-text-mask-input">PHONE</InputLabel>
              <Input
                value={values.textmask}
                onChange={handleChange}
                name="textmask"
                id="formatted-text-mask-input"
                inputComponent={TextMaskCustom}
              />
            </div> */}

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

            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={() => redirecionarHome()}
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;

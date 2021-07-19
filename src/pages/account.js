import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useAllocate } from "../context/allocate";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { useFormik } from "formik";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import SaveIcon from "@material-ui/icons/Save";

const useStyle = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const useStyl = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function Account() {
  let history = useHistory();

  const redirectContacts = () => {
    history.push(`/contacts`);
  };
  const redirectAccount = () => {
    history.push(`/account`);
  };
  const redirectList = () => {
    history.push(`/list`);
  };

  const classe = useStyle();

  const { token, touch, setTouch } = useAllocate();

  const classes = useStyles();

  const [hid, setHid] = useState(true);

  const clas = useStyl();

  function hidden() {
    hid === true ? setHid(false) : setHid(true);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    history.push("/login");
  }

  useEffect(() => {
    async function myStatus() {
      await axios
        .get("http://localhost:3312/user/showUser", {
          headers: {
            Authorization: `bearer ${token.token}`,
          },
        })
        .then(function(result) {
          setTouch(result.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    myStatus();
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async function alterar(item) {
    await axios
      .put(
        "http://localhost:3312/user/modifyUser",
        {
          name: item.name,
          email: item.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      )
      .then(function(result) {
        setTouch(result.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  const formik = useFormik({
    initialValues: {
      name: touch.name,
      email: touch.email,
    },
    enableReinitialize: true,
    onSubmit: (dados) => {
      alterar(dados);
    },
  });

  const firstLetter = touch.name.substr(0, 1);

  if (!("serviceWorker" in navigator)) {
    return;
  }

  if (!("PushManager" in window)) {
    return;
  }

  console.log("touch -->", firstLetter);

  return (
    <div className="accountMain">
      <nav>
        <ButtonGroup
          variant="text"
          color="primary"
          aria-label="text primary button group"
        >
          <Button onClick={() => redirectList()}>conversas</Button>
          <Button onClick={() => redirectContacts()}>contatos</Button>
          <Button onClick={() => redirectAccount()}>conta</Button>
        </ButtonGroup>
      </nav>
      <div className="data"></div>

      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {firstLetter}
            </Avatar>
          }
          title={touch.name}
          subheader={touch.email}
        />

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            <label>
              <div className="accountPhone">phone: {touch.phone} </div>
            </label>{" "}
            <IconButton
              aria-label="delete"
              className={classes.margin}
              size="small"
              onClick={() => hidden()}
            >
              <ArrowDownwardIcon fontSize="inherit" />
            </IconButton>
          </Typography>
        </CardContent>

        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<DeleteIcon />}
          cursor="pointer"
          onClick={logout}
        >
          Sair
        </Button>
      </Card>

      <form
        className={classe.root}
        noValidate
        autoComplete="off"
        hidden={hid}
        onSubmit={formik.handleSubmit}
      >
        <TextField
          id="name"
          label="Name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <br></br>

        {/* <TextField id="picture" label="Picture"  value={touch.photo} /> */}
        {/* <br></br> */}
        <TextField
          id="email"
          label="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />

        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<SaveIcon />}
          type="submit"
        >
          Save
        </Button>
      </form>
    </div>
  );
}

export default Account;

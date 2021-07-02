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
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";

const useStyle = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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

  function hidden() {
    hid === true ? setHid(false) : setHid(true);
  }

  useEffect(() => {
    async function myStatus() {
      await axios
        .get("http://localhost:3312/user/showUser", {
          headers: {
            Authorization: `token ${token.token}`,
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

  async function alterar() {
    await axios
      .put("http://localhost:3312/user/modifyUser", {
        headers: {
          Authorization: `token ${token.token}`,
        },
        // nome: formik.values.nome,
        // modelo: formik.values.modelo,
        // preco: formik.values.preco,
        // quantidade: formik.values.quantidade,
      })
      .then(function(result) {
        console.log(result.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  // const formik = useFormik({
  //   initialValues: {
  //     // nome: rotativo.nome,
  //     // modelo: rotativo.modelo,
  //     // preco: rotativo.preco,
  //     // quantidade: rotativo.quantidade,
  //   },
  //   enableReinitialize: true,
  //   onSubmit: (identificar) => {
  //     funcaoAlterar(identificar);
  //   },
  // });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if (!("serviceWorker" in navigator)) {
    return;
  }

  if (!("PushManager" in window)) {
    return;
  }
  console.log("touch -->",touch)

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
              R
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
          </Typography>
        </CardContent>
      </Card>
      <button onClick={() => hidden()}>Alterar</button>
      <form className={classe.root} noValidate autoComplete="off" hidden={hid}>
        <TextField id="nome" label="Name" placeholder={touch.name} type="text"/>
        <br></br>
        {/* <TextField id="picture" label="Picture"  value={touch.photo} /> */}
        <br></br>
        <TextField id="Email" label="Email" value={touch.email} />
      </form>
    </div>
  );
}

export default Account;

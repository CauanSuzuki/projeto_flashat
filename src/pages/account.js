import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useAllocate } from "../context/allocate";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function Account() {
  const { token } = useAllocate();

  useEffect(() => {
    async function myStatus() {
      await axios
        .get("http://localhost:3312/user/showUser", {
          headers: {
            Authorization: `token ${token}`,
          },
        })
        .then(function (result) {
          setTouch(result.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    myStatus();
  }, []);
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
  const classes = useStyles();

  const [touch, setTouch] = useState([]);

  console.log(touch);

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
      <Button
        type="submit"
        value="send"
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => redirectList()}
      >
        RETURN
      </Button>

      <label>
        <div className="accountName">name: {touch.name}</div>
      </label>

      <label>
        <div className="accountPhone">phone: {touch.phone} </div>
      </label>

      <label>
        <div className="accountEmail">email: {touch.email}</div>
      </label>
    </div>
  );
}

export default Account;

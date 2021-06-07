import React, { useState, useEffect } from "react";
import ReactDOM, { useHistory } from "react-router-dom";
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
  const { data, setData } = useAllocate();

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

  useEffect(() => {
    async function list() {
      axios
        .get("http://localhost:3312/user/create", {})
        .then(function (result) {
          setData(result.data);
          console.log("result.data -->", result.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    list();
  }, []);

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
        {data.map((item) => (
          <div key={item.id}>
            <div className="wrapper">
              <div className="phone">{item.phone}</div>

              <div className="name">{item.name}</div>

              <div className="email">{item.email}</div>
            </div>
            <hr></hr>
          </div>
        ))}
      </label>
    </div>
  );
}

export default Account;

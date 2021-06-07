import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

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
        <div className="accountName">name: Cauan Felipe de Lima Suzuki</div>
      </label>

      <label>
        <div className="accountPhone">phone: (14)996053826 </div>
      </label>

      <label>
        <div className="accountEmail">cauanlima5@gmail.com</div>
      </label>
    </div>
  );
}

export default Account;

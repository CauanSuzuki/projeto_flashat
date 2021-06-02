import React from "react";
import ReactDOM, { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function List() {
  let history = useHistory();

  const redirectContacts = () => {
    history.push(`/contacts`);
  };
  const redirectAccount = () => {
    history.push(`/account`);
  };
  const redirectList = () => {
    history.push(`/`);
  };
  const redirectChat = () => {
    history.push(`/chat`);
  };

  const classes = useStyles();


  return (
    <div className="listMain">
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
      <div>
        <Button href="#text-buttons" color="primary">
          Search
        </Button>
        <TextField id="standard-basic" />
        <div>
          <dl>
            <dt>
            <hr></hr>
              <Button variant="outlined" onClick={() => redirectChat()}>
                conversa
              </Button>
            </dt>
            <hr></hr>
            <dt>
              <Button variant="outlined" onClick={() => redirectChat()}>
                conversa
              </Button>
            </dt>
            <hr></hr>
            <dt>
              <Button variant="outlined" onClick={() => redirectChat()}>
                conversa
              </Button>
            </dt>
            <hr></hr>
            <dt>
              <Button variant="outlined" onClick={() => redirectChat()}>
                conversa
              </Button>
            </dt>
            <hr></hr>
            <dt>
              <Button variant="outlined" onClick={() => redirectChat()}>
                conversa
              </Button>
            </dt>
            <hr></hr>
            <dt>
              <Button variant="outlined" onClick={() => redirectChat()}>
                conversa
              </Button>
            </dt>
            <hr></hr>
            <dt>
              <Button variant="outlined" onClick={() => redirectChat()}>
                conversa
              </Button>
            </dt>
          </dl>
        </div>
        <hr></hr>
      </div>
    </div>
  );
}
export default List;

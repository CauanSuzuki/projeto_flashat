import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from "@material-ui/core/TextField";
import "react-chat-elements/dist/main.css";
import { ChatItem } from "react-chat-elements";

function Contacts() {
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
  const redirectChat = () => {
    history.push(`/chat`);
  };

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
            <label>
              <div>
                <ChatItem
                  avatar={
                    "https://static.clubedaanamariabraga.com.br/wp-content/uploads/2021/04/frango-assado-em-pe.jpg"
                  }
                  alt={"Reactjs"}
                  title={"Contato"}
                  onClick={redirectChat}
                />
              </div>
            </label>
            <label>
              <div>
                <ChatItem
                  avatar={
                    "https://static.clubedaanamariabraga.com.br/wp-content/uploads/2021/04/frango-assado-em-pe.jpg"
                  }
                  alt={"LN"}
                  title={"Contato"}
                  onClick={redirectChat}
                />
              </div>
            </label>

            <label>
              <div>
                <ChatItem
                  avatar={
                    "https://static.clubedaanamariabraga.com.br/wp-content/uploads/2021/04/frango-assado-em-pe.jpg"
                  }
                  title={"Contato"}
                  onClick={redirectChat}
                />
              </div>
            </label>
          </dl>
        </div>
        <hr></hr>
      </div>
    </div>
  );
}
export default Contacts;

import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from "@material-ui/core/TextField";
import "react-chat-elements/dist/main.css";
import { ChatItem } from "react-chat-elements";
import {} from "./style.css";
import conversas from "../data/conversas.json";
import axios from "axios";
import { useAllocate } from "../context/allocate";

function Contacts({children}) {
  
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
    history.push(`/chat/${conversas.idChat}`);
  };
  let identificar = useParams();
  const {
    senha,
    data,
    token,
    touch,
    setSenha,
    login,
    setLogin,
    setData,
    setToken,
  } = useAllocate();

  useEffect(() => {
    async function showContact() {
      axios
      .get(`http://localhost:3312/contacts/mycontacts`, {
        headers: {
          Authorization: `token ${token.token}`,
        },
      })
      .then(function(result) {
        setData(result.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  showContact();
  }, []);


  console.log("data-->", data);

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
                {data.map((item) => (
                  <ChatItem
                    avatar={
                      "https://static.clubedaanamariabraga.com.br/wp-content/uploads/2021/04/frango-assado-em-pe.jpg"
                    }
                    title={item.name}
                    onClick={redirectChat}
                  />
                ))}
              </div>
            </label>
          </dl>
        </div>
      </div>
    </div>
  );
}
export default Contacts;

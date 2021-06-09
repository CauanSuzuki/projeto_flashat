import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from "@material-ui/core/TextField";
import "react-chat-elements/dist/main.css";
import { ChatItem } from "react-chat-elements";
import {} from "./style.css";
import { useFormik } from "formik";
import conversas from "../data/conversas.json";

function List() {
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

  const [atualizacao, setAtualizacao] = useState([]);
  const [pesquisa, setPesquisa] = useState("");

  const reserch = (contato) => {
    setAtualizacao(conversas.filter((value) => value.contato.includes(pesquisa)));
  };

  console.log("att -->", atualizacao);
  console.log("pes -->", pesquisa);
  console.log(atualizacao);
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
        <Button href="#text-buttons" color="primary" onClick={() => reserch()}>
          Search
        </Button>
        <TextField
          id="standard-basic"
          onChange={(event) => setPesquisa(event.target.value)}
        />
        <div>
          <dl>
            <label>
              <div>
                {atualizacao.length === 0
                  ? conversas.map((item) => (
                      <ChatItem
                        key={item.id}
                        avatar={
                          "https://static.clubedaanamariabraga.com.br/wp-content/uploads/2021/04/frango-assado-em-pe.jpg"
                        }
                        alt={"Reactjs"}
                        title={item.contato}
                        subtitle={item.lastMensage}
                        date={new Date()}
                        unread={0}
                        onClick={redirectChat}
                      />
                    ))
                  : atualizacao.map((item) => (
                      <ChatItem
                        key={item.id}
                        avatar={
                          "https://static.clubedaanamariabraga.com.br/wp-content/uploads/2021/04/frango-assado-em-pe.jpg"
                        }
                        alt={"Reactjs"}
                        title={item.contato}
                        subtitle={item.lastMensage}
                        date={new Date()}
                        unread={0}
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
export default List;

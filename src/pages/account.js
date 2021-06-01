import React from "react";
import ReactDOM, { useHistory } from "react-router-dom";
function Account() {
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
  return (
    <div className="accountMain">
      <nav>
        <button onClick={() => redirectList()}>conversas</button>
        <button onClick={() => redirectContacts()}>contatos</button>
        <button onClick={() => redirectAccount()}>conta</button>
      </nav>
      <p>informações contatos</p>
    </div>
  );
}

export default Account;

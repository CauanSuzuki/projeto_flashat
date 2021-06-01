import React from "react";
function Chat() {
  return (
    <div className="chatMain">
      <div className="Nav">
        <button>RETURN</button>
        <h1>login("numero do celular")</h1>
      </div>
      <hr></hr>
      <div className="chatPlace">
        <p>(CS)vamos trocar menmsagem</p>
        <p>(LO) estamos convesando </p>
      </div>
      <hr></hr>
      <div className="textPlace">
          <p>Digitando texto</p>
          <button>enviar Mensagem</button>
      </div>
    </div>
  );
}
export default Chat;

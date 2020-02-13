import React, { Component } from "react";
import "./App.css";
import web3 from "./web3";
import loteria from "./loteria";

class App1 extends Component {
  state = {
    gerente: ""
  };

  async componentDidMount() {
    const gerente = await loteria.methods.gerente().call();
    this.setState({ gerente });
  }
  render() {
    console.log(web3.version);

    return (
      <div>
        <h2>Contrato de Loteria</h2>
        <p>Este contrato é gerenciado por {this.state.gerente}</p>
      </div>
    );
  }
}

export default App1;

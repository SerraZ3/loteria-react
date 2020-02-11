import React, { Component } from "react";
//import logo from './logo.svg';
import "./App.css";
import web3 from "./web3";
import loteria from "./loteria";

class App extends Component {
  state = {
    gerente: "",
    jogadores: [],
    saldo: "",
    value: "",
    mensagem: ""
  };

  async componentDidMount() {
    const gerente = await loteria.methods.gerente().call();
    const jogadores = await loteria.methods.getJogadores().call();
    const saldo = await web3.eth.getBalance(loteria.options.address);
    this.setState({ gerente, jogadores, saldo });
  }
  onSubmit = async event => {
    event.preventDefault();
    this.setState({ mensagem: "Aguardando a  validação da transação..." });
    const contas = await web3.eth.getAccounts();
    console.log(contas);

    await loteria.methods.jogar().send({
      from: contas[0],
      value: web3.utils.toWei(this.state.value, "ether")
    });
    this.setState({ mensagem: "Transação concluida!" });
  };
  onClick = async () => {
    this.setState({ mensagem: "Aguarde o processamento!" });
    const contas = await web3.eth.getAccounts();
    await loteria.methods.sorteio().send({
      from: contas[0]
    });
    this.setState({ mensagem: "Um vencedor foi escolhido!" });
  };
  render() {
    return (
      <div>
        <h2>Contrato de Loteria</h2>
        <p>Este contrato é gerenciado por {this.state.gerente}</p>
        <p>
          Existem agora {this.state.jogadores.length} pessoas apostando para
          ganhar {web3.utils.fromWei(this.state.saldo, "ether")} ether
        </p>
        <br />
        <form onSubmit={this.onSubmit}>
          <h4>Quanto deseja apostar?</h4>
          <div>
            <label>Quantidade de ether para ser enviado: </label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Jogar</button>
        </form>
        <hr />
        <h4>Realizar sorteio? </h4>
        <button onClick={this.onClick}> Sortear</button>
        <hr />
        <h1>{this.state.mensagem}</h1>
      </div>
    );
  }
}

export default App;

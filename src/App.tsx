import { Component } from "react";
import { Species } from "./Type/Type";
import "./App.css";
import Output from "./Componets/Output/Output";

type State = {
  dataSW: Species[];
  countPage: number;
};
class App extends Component<State> {
  state = {
    dataSW: [],
    countPage: 1,
  };

  eventСounterDicrement() {
    this.setState({ countPage: this.state.countPage - 1 });
  }

  eventСounterIncrement() {
    this.setState({ countPage: this.state.countPage + 1 });
  }

  componentDidUpdate(_: State, prevState: State) {
    if (prevState.countPage !== this.state.countPage) {
      this.fetchData();
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch("https://swapi.dev/api/species/?page=" + this.state.countPage)
      .then((res) => res.json())
      .then((answer: { results: Species[] }) => {
        this.setState({ dataSW: answer.results });
      });
  }

  render() {
    if (this.state.dataSW.length === 0) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Output
          data={this.state.dataSW}
          counterPlus={this.eventСounterIncrement.bind(this)}
          counterMinus={this.eventСounterDicrement.bind(this)}
          numberPagination={this.state.countPage}
        />
      </div>
    );
  }
}

export default App;

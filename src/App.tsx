import { Component } from "react";
import { Species } from "./Type/Type";
import "./App.css";
import Output from "./Componets/Output/Output";
import Search from "./Componets/Search/Search";

type State = {
  dataSW: Species[];
  countPage: number;
  checkSearchWord: boolean;
};
class App extends Component<State> {
  state = {
    dataSW: [],
    countPage: 1,
    checkSearchWord: true,
  };

  writeWordLocal(word: string) {
    localStorage.setItem("searchWord", word);
  }

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
    const searchWord = localStorage.getItem("searchWord") || "";
    this.fetchData(searchWord);
  }

  fetchData(search = "") {
    const wordSearch = search
      ? "https://swapi.dev/api/species/?search=" + search
      : "https://swapi.dev/api/species/?page=" + this.state.countPage;
    fetch(wordSearch)
      .then((res) => res.json())
      .then((answer: { results: Species[] }) => {
        if (answer.results.length) {
          this.setState({ dataSW: answer.results, checkSearchWord: true });
          this.writeWordLocal(search);
        } else this.setState({ checkSearchWord: false });
      });
  }

  render() {
    if (this.state.dataSW.length === 0) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Search
          data={this.state.dataSW}
          callbackSearch={this.fetchData.bind(this)}
        />
        {!this.state.checkSearchWord ? (
          <div>Not found, write another request</div>
        ) : (
          ""
        )}
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

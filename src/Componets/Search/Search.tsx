import { Component, ChangeEvent } from "react";
//import Output from "../Output/Output";
import { Species } from "../../Type/Type";

type OutputProps = {
  data: Species[];
  callbackSearch: (search: string) => void;
};

type inputVariables = {
  searchText: string;
};

class Search extends Component<OutputProps, inputVariables> {
  constructor(props: OutputProps) {
    super(props);
    this.state = {
      searchText: "",
    };
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchText: event.target.value });
  };

  handleButtonClick = () => {
    this.props.callbackSearch(this.state.searchText);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="search creature race"
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleButtonClick}>search</button>
      </div>
    );
  }
}

export default Search;

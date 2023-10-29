import { Component } from "react";

type inputVariables = {
  hasError: boolean;
};

class ButtonWithError extends Component<Record<string, never>, inputVariables> {
  state = {
    hasError: false,
  };

  render() {
    if (this.state.hasError) {
      throw Error("A specially caused error");
    }

    return (
      <button onClick={() => this.setState({ hasError: true })}>
        Сalling an error
      </button>
    );
  }
}

export default ButtonWithError;

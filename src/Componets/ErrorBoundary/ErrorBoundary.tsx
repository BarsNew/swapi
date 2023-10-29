import { Component, ReactNode } from "react";

type Props = {
  error: Error | null;
  children: ReactNode;
};

type inputVariables = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends Component<Props, inputVariables> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  componentDidCatch(error: Error) {
    this.setState({
      hasError: true,
      error,
    });
  }

  render() {
    if (this.state.hasError) {
      console.log("Console.log:", this.state.error);
      return <div>Error caught</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

import { Component } from "react";
import { Species } from "../../Type/Type";
import CartBlock from "../CartBlock/CartBlock";
import "./Output.css";

type OutputProps = {
  data: Species[];
  counterPlus: () => void;
  counterMinus: () => void;
  numberPagination: number;
};

class Output extends Component<OutputProps> {
  constructor(props: OutputProps) {
    super(props);
  }

  changeCount(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    callback: () => void,
    direction: string,
  ) {
    const button = event.target as HTMLButtonElement;
    if (
      (direction === "+" && this.props.numberPagination < 4) ||
      (direction === "-" && this.props.numberPagination > 1)
    ) {
      button.disabled = true;
      callback();
      setTimeout(() => (button.disabled = false), 2000);
    }
  }

  render() {
    return (
      <div>
        <button
          onClick={(ev) => this.changeCount(ev, this.props.counterMinus, "-")}
        >
          -
        </button>
        <span> {this.props.numberPagination} </span>
        <button
          onClick={(ev) => this.changeCount(ev, this.props.counterPlus, "+")}
        >
          +
        </button>
        <div className="main-block">
          {this.props.data.map((item: Species) => (
            <CartBlock key={item.name} dataItem={item} />
          ))}
        </div>
      </div>
    );
  }
}

export default Output;

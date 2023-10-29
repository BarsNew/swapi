import { Component } from "react";
import { Species } from "../../Type/Type";
import "./CartBlock.css";

type OutputProps = {
  dataItem: Species;
};

class CartBlock extends Component<OutputProps> {
  constructor(props: OutputProps) {
    super(props);
  }

  render() {
    return (
      <div className="main-block_item">
        <h2>{this.props.dataItem.name}</h2>
        <p>designation: {this.props.dataItem.designation}</p>
        <p>average height: {this.props.dataItem.average_height} sm</p>
        <p>skin_colors: {this.props.dataItem.skin_colors}</p>
        <p>hair_colors: {this.props.dataItem.hair_colors}</p>
        <p>eye_colors: {this.props.dataItem.eye_colors}</p>
      </div>
    );
  }
}

export default CartBlock;

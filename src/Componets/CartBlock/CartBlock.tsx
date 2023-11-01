import { Species } from "../../Type/Type";
import "./CartBlock.css";

type OutputProps = {
  dataItem: Species;
};

function CartBlock(props: OutputProps) {
  return (
    <div className="main-block_item">
      <h2>{props.dataItem.name}</h2>
      <p>designation: {props.dataItem.designation}</p>
      <p>average height: {props.dataItem.average_height} sm</p>
      <p>skin_colors: {props.dataItem.skin_colors}</p>
      <p>hair_colors: {props.dataItem.hair_colors}</p>
      <p>eye_colors: {props.dataItem.eye_colors}</p>
    </div>
  );
}

export default CartBlock;

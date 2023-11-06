import { Species } from "../../Type/Type";
import "./CartBlock.css";

type OutputProps = {
  dataItem: Species;
};

function CartBlock(props: OutputProps) {
  return (
    <>
      <h2 className="noexit">{props.dataItem.name}</h2>
    </>
  );
}

export default CartBlock;

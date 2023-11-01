import { Species } from "../../Type/Type";
import CartBlock from "../CartBlock/CartBlock";
import "./Output.css";

type Props = {
  data: Species[];
  counterPlus: () => void;
  counterMinus: () => void;
  numberPagination: number;
};

function Output(props: Props) {
  function changeCount(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    callback: () => void,
    direction: string,
  ) {
    const button = event.target as HTMLButtonElement;
    if (
      (direction === "+" && props.numberPagination < 4) ||
      (direction === "-" && props.numberPagination > 1)
    ) {
      button.disabled = true;
      callback();
      setTimeout(() => (button.disabled = false), 2000);
    }
  }

  return (
    <div>
      <button onClick={(ev) => changeCount(ev, props.counterMinus, "-")}>
        -
      </button>
      <span> {props.numberPagination} </span>
      <button onClick={(ev) => changeCount(ev, props.counterPlus, "+")}>
        +
      </button>
      <div className="main-block">
        {props.data.map((item: Species) => (
          <CartBlock key={item.name} dataItem={item} />
        ))}
      </div>
    </div>
  );
}

export default Output;

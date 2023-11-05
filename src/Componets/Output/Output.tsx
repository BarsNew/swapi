import { Species } from "../../Type/Type";
import CartBlock from "../CartBlock/CartBlock";
import "./Output.css";
import { Link } from "react-router-dom";

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

  function calculatePosition(url: string) {
    const arrUrl = url.split("/");
    return arrUrl[arrUrl.length - 2];
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
          <Link
            className="main-block_item"
            to={
              "?page=" +
              props.numberPagination +
              "&detalis=" +
              calculatePosition(item.url)
            }
            key={item.name}
          >
            <CartBlock dataItem={item} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Output;

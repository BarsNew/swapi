import { useContext } from "react";
import Context from "../Context/Context";

type Props = {
  counterPlus: () => void;
  counterMinus: () => void;
  numberPagination: number;
};

function Pagination(props: Props) {
  const fullCountPosition = useContext(Context);

  function changeCount(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    callback: () => void,
    direction: string,
  ) {
    const button = event.target as HTMLButtonElement;
    if (
      (direction === "+" &&
        props.numberPagination < Math.ceil(fullCountPosition / 10)) ||
      (direction === "-" && props.numberPagination > 1)
    ) {
      button.disabled = true;
      callback();
      setTimeout(() => (button.disabled = false), 2000);
    }
  }

  return (
    <div className="div-button-output">
      <button
        className="noexit"
        onClick={(ev) => changeCount(ev, props.counterMinus, "-")}
      >
        -
      </button>
      <span> {props.numberPagination} </span>
      <button
        className="noexit"
        onClick={(ev) => changeCount(ev, props.counterPlus, "+")}
      >
        +
      </button>
    </div>
  );
}

export default Pagination;

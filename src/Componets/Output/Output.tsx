import { Species } from "../../Type/Type";
import CartBlock from "../CartBlock/CartBlock";
import "./Output.css";
import { Link } from "react-router-dom";
import Pagination from "../Pagination/Pagination";

type Props = {
  data: Species[];
  counterPlus: () => void;
  counterMinus: () => void;
  numberPagination: number;
  openBlockPagination: boolean;
};

function Output(props: Props) {
  function calculatePosition(url: string) {
    const arrUrl = url.split("/");
    return arrUrl[arrUrl.length - 2];
  }

  return (
    <div>
      {!props.openBlockPagination ? (
        ""
      ) : (
        <Pagination
          numberPagination={props.numberPagination}
          counterPlus={props.counterPlus}
          counterMinus={props.counterMinus}
        />
      )}
      <div className="main-block" data-testid="main-block">
        {props.data.length < 1
          ? "No Data"
          : props.data.map((item: Species) => (
              <Link
                className="main-block_item noexit"
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

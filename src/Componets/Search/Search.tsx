import { useState, ChangeEvent } from "react";
import "./Search.css";

type OutputProps = {
  callbackSearch: (search: string) => void;
  installSearch: (search: string) => void;
};

function Search(props: OutputProps) {
  const [searchText, setSearchText] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleButtonClick = () => {
    props.callbackSearch(searchText);
    props.installSearch(searchText);
  };

  return (
    <div className="block-search">
      <input
        className="block-search__input"
        type="text"
        placeholder="search creature race"
        onChange={handleInputChange}
      />
      <button className="block-search__button" onClick={handleButtonClick}>
        search
      </button>
    </div>
  );
}

export default Search;

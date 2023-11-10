import { useState, ChangeEvent, useEffect } from "react";
import "./Search.css";

type OutputProps = {
  fetchData: (search: string) => void;
  changeSearch: (search: string) => void;
};

function Search(props: OutputProps) {
  const [searchText, setSearchText] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleButtonClick = () => {
    props.fetchData(searchText);
    props.changeSearch(searchText);
  };

  useEffect(() => {
    const storedValue = localStorage.getItem("searchWord");
    if (storedValue) setSearchText(storedValue);
  }, []);

  return (
    <div className="block-search">
      <input
        value={searchText}
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

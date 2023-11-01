import { useState, useEffect } from "react";
import { Species } from "./Type/Type";
import "./App.css";
import Output from "./Componets/Output/Output";
import Search from "./Componets/Search/Search";
import ButtonWithError from "./Componets/ButtonWithError/ButtonWithError";

function App() {
  const [dataSW, setDataSW] = useState<Species[]>([]);
  const [countPage, setCountPage] = useState<number>(1);
  const [checkSearchWord, setCheckSearchWord] = useState<boolean>(true);

  function writeWordLocal(word: string) {
    localStorage.setItem("searchWord", word);
  }

  function eventСounterDicrement() {
    setCountPage(countPage - 1);
  }

  function eventСounterIncrement() {
    setCountPage(countPage + 1);
  }

  useEffect(() => {
    const searchWord = localStorage.getItem("searchWord") || "";
    fetchData(searchWord);
  }, [countPage]);

  function fetchData(search = "") {
    const wordSearch = search
      ? "https://swapi.dev/api/species/?search=" + search
      : "https://swapi.dev/api/species/?page=" + countPage;
    fetch(wordSearch)
      .then((res) => res.json())
      .then((answer: { results: Species[] }) => {
        if (answer.results.length) {
          setDataSW(answer.results);
          setCheckSearchWord(true);
          writeWordLocal(search);
        } else setCheckSearchWord(false);
      });
  }

  if (dataSW.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Search callbackSearch={fetchData} />
      {!checkSearchWord ? (
        <div className="warning-search">Not found, write another request</div>
      ) : (
        ""
      )}
      <Output
        data={dataSW}
        counterPlus={eventСounterIncrement}
        counterMinus={eventСounterDicrement}
        numberPagination={countPage}
      />
      <ButtonWithError />
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import { Species } from "./Type/Type";
import "./App.css";
import Output from "./Componets/Output/Output";
import Search from "./Componets/Search/Search";
import ButtonWithError from "./Componets/ButtonWithError/ButtonWithError";
//import Navigation from "./Componets/Navigation/Navigation";
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

function App() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pageValue = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;
  const [dataSW, setDataSW] = useState<Species[]>([]);
  const [countPage, setCountPage] = useState<number>(pageValue);
  const [checkSearchWord, setCheckSearchWord] = useState<boolean>(true);
  const [hideDetailsValue, setHideDetailsValue] = useState(false);
  const [isLoad, setIsload] = useState(false);

  const navigate = useNavigate();

  function writeWordLocal(word: string) {
    localStorage.setItem("searchWord", word);
  }

  function eventСounterDicrement() {
    setCountPage(countPage - 1);
    changePage(countPage - 1);
  }

  function eventСounterIncrement() {
    setCountPage(countPage + 1);
    changePage(countPage + 1);
  }

  function hideDetails(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setHideDetailsValue(true);
    if (
      (event.target as HTMLElement).tagName == "H2" ||
      (event.target as HTMLElement).tagName == "A"
    ) {
      setHideDetailsValue(false);
    }
  }

  useEffect(() => {
    const searchWord = localStorage.getItem("searchWord") || "";
    fetchData(searchWord);
  }, [countPage]);

  function changePage(pageNumber: number) {
    navigate("");
    if (pageNumber) navigate(`?page=${pageNumber}`);
  }

  function changeSearch(searchWord: string) {
    if (searchWord) navigate(`?search=${searchWord}`);
    else {
      navigate("");
      localStorage.setItem("searchWord", "");
      setCountPage(1);
    }
  }

  function fetchData(search = "") {
    const wordSearch = search
      ? "https://swapi.dev/api/species/?search=" + search
      : "https://swapi.dev/api/species/?page=" + countPage;
    setIsload(true);
    fetch(wordSearch)
      .then((res) => res.json())
      .then((answer: { results: Species[] }) => {
        if (answer.results.length) {
          setDataSW(answer.results);
          setCheckSearchWord(true);
          writeWordLocal(search);
          setIsload(false);
        } else setCheckSearchWord(false);
      });
  }

  if (dataSW.length === 0) {
    return <div style={{ margin: "150px" }}>Loading...</div>;
  }

  return (
    <div>
      <Search callbackSearch={fetchData} installSearch={changeSearch} />
      {!checkSearchWord ? (
        <div className="warning-search">Not found, write another request</div>
      ) : (
        ""
      )}
      {isLoad ? (
        <div style={{ margin: "150px" }}>Loading...</div>
      ) : (
        <div className="output-detalis">
          <div onClick={hideDetails}>
            <Output
              data={dataSW}
              counterPlus={eventСounterIncrement}
              counterMinus={eventСounterDicrement}
              numberPagination={countPage}
            />
          </div>
          <div className="app-outlet">{hideDetailsValue ? "" : <Outlet />}</div>
        </div>
      )}
      <ButtonWithError />
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import { useNavigate, useLocation } from "react-router-dom";
import "./Detalis.css";

function Detalis() {
  const location = useLocation();
  const navigate = useNavigate();
  const detalisNumb = useLoaderData();
  const [propertySpecis, setPropertySpecis] = useState<{ detail?: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isHidden, setIsHidden] = useState(true);

  const installHidden = () => {
    const searchParams = new URLSearchParams(location.search);
    navigate(`?page=${searchParams.get("page")}`);
  };

  useEffect(() => {
    if (detalisNumb) {
      setIsLoading(true);
      setTimeout(() => {
        fetch("https://swapi.dev/api/species/" + detalisNumb)
          .then((responce) => responce.json())
          .then((res) => {
            setPropertySpecis(res);
            setIsLoading(false);
            setIsHidden(true);
          });
      }, 1000);
    } else {
      setPropertySpecis({});
      setIsLoading(false);
      setIsHidden(true);
    }
  }, [detalisNumb]);

  if (
    propertySpecis &&
    propertySpecis.detail &&
    propertySpecis.detail === "Not found"
  ) {
    return (
      <div className={`${isHidden ? "details noexit" : "details hidden"}`}>
        <p className="detalis-other">Data no found</p>
      </div>
    );
  }

  if (isLoading)
    return (
      <div className={`${isHidden ? "details noexit" : "details hidden"}`}>
        <p className="detalis-other">Loading...</p>
      </div>
    );

  if (Object.entries(propertySpecis).length > 1) {
    return (
      <div className={`${isHidden ? "details noexit" : "details hidden"}`}>
        <div className="div-button noexit">
          <button onClick={installHidden}>×</button>
        </div>
        {Object.entries(propertySpecis).map(([keyObj, value]) => {
          if (typeof value === "string") {
            return (
              <p key={keyObj} className="noexit">
                {keyObj}: {value}
              </p>
            );
          }
          return null;
        })}
      </div>
    );
  }

  return <div className="details"></div>;
}

export default Detalis;

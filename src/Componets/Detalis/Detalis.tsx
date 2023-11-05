import { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import "./Detalis.css";

function Detalis() {
  const detalisNumb = useLoaderData();
  console.log(detalisNumb);
  const [propertySpecis, setPropertySpecis] = useState<{ detail?: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isHidden, setIsHidden] = useState(true);

  const installHidden = () => {
    setIsHidden(false);
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
      <div className={`${isHidden ? "details" : "details hidden"}`}>
        Data no found
      </div>
    );
  }

  if (isLoading)
    return (
      <div className={`${isHidden ? "details" : "details hidden"}`}>
        Loading...
      </div>
    );

  if (Object.entries(propertySpecis).length > 1) {
    return (
      <div className={`${isHidden ? "details" : "details hidden"}`}>
        <button onClick={installHidden}>X</button>
        {Object.entries(propertySpecis).map(([keyObj, value]) => {
          if (typeof value === "string") {
            return (
              <p key={keyObj}>
                {keyObj}: {value}
              </p>
            );
          }
          return null;
        })}
      </div>
    );
  }

  return <></>;
}

export default Detalis;

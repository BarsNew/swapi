import { useState } from "react";

function ButtonWithError() {
  const [hasError, setHasError] = useState<boolean>(false);

  if (hasError) {
    throw Error("A specially caused error");
  }

  return (
    <button style={{ margin: 20 }} onClick={() => setHasError(true)}>
      Сalling an error
    </button>
  );
}

export default ButtonWithError;

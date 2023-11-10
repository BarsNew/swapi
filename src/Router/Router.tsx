import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorBoundary from "../Componets/ErrorBoundary/ErrorBoundary";
import Detalis from "../Componets/Detalis/Detalis";
import Error from "../Componets/Error/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary error={null}>
        <App />
      </ErrorBoundary>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Detalis />,
        loader: (request) => {
          const url = new URL(request.request.url);
          const detalis = url.searchParams.get("detalis");
          if (detalis) return detalis;
          else return "";
        },
      },
    ],
  },
  {
    path: "about",
    element: <p>About</p>,
  },
]);

//import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorBoundary from "./Componets/ErrorBoundary/ErrorBoundary";
import Error from "./Componets/Error/Error";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Detalis from "./Componets/Detalis/Detalis";

const router = createBrowserRouter([
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
        path: "/?page1&detalis=Human",
        element: <Detalis />,
      },
    ],
  },
  {
    path: "about",
    element: <p>about</p>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);

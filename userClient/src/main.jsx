import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "./index.css";
import Router from "./components/Router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);

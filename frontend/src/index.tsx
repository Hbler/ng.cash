import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter } from "react-router-dom";

import RootProvider from "./providers/rootProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RootProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RootProvider>
  </React.StrictMode>
);

reportWebVitals();

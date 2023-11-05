import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import AddProductPage from "./pages/AddProductPage";

const root = ReactDOM.createRoot(document.getElementById("root"));

// factory fuggveny (= legyartja az object-et, nem en peldanyositom), legyart egy browser router-t a megadott konfiguracio alapjan
const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "add-product",
        element: <AddProductPage />
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
// eslint-disable-next-line no-unused-vars
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./assets/components/Layout/Home.jsx";
import Shop from "./assets/components/Shop/Shop.jsx";
import Inventory from "./assets/components/Inventory/Inventory.jsx";
import Orders from "./assets/components/Orders/Orders.jsx";
import Login from "./assets/components/Login/Login.jsx";
import cartProductLoader from "./loaders/cartProductsLoader.js";
import Payment from "./assets/components/Payment/Payment.jsx";
import SignUp from "./assets/components/SignUp/SignUp.jsx";
import AuthProvider from "./assets/components/providers/AuthProvider.jsx";
import Checkout from "./assets/components/Checkout/Checkout.jsx";
import PrivateRoutes from "./routes/PrivateRoutes.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: "/",
        element: <Shop></Shop>,
      },
      {
        path: "/orders",
        element: <Orders></Orders>,
        loader: cartProductLoader,
      },
      {
        path: "/inventory",
        element: <Inventory></Inventory>,
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoutes>
            <Checkout></Checkout>
          </PrivateRoutes>
        ),
      },
      {
        path: "/payment",
        element: <Payment></Payment>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

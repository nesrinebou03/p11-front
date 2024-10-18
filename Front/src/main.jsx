import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import store from './redux/store'
import { Provider } from 'react-redux'

import "./index.css";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import User from "./pages/user/User.jsx";
import Erreur from "./pages/Erreur/Erreur.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: '/user',
        element: <User/>
      },
      {
        path: "/*",
        element: <Erreur/>,
      }
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
     <RouterProvider router={router} />
     </Provider>
  </React.StrictMode>,
)

import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createHashRouter,
  RouterProvider
} from "react-router-dom";
import React from 'react';
import ReactDOM from "react-dom/client";
import App from "./App";
import StatsPage from "./pages/StatsPage";
import HomePage from "./pages/HomePage";
import DecksPage from "./pages/DecksPage";
import AdminToolsPage from "./pages/AdminToolsPage";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/stats",
        element: <StatsPage />
      },
      {
        path: "/decks",
        element: <DecksPage />
      },
      {
        path: "/admintools",
        element: <AdminToolsPage />,
        requiresAuth: true
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider
      router={router}
      fallbackElement={<HomePage />}
    />
);

reportWebVitals();
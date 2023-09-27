import './index.css';
import reportWebVitals from './reportWebVitals';
import { Amplify, API } from "aws-amplify";
import awsconfig from './aws-exports';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import React from 'react';
import ReactDOM from "react-dom/client";
import App from "./App";
import StatsPage from "./pages/StatsPage";
import HomePage from "./pages/HomePage";
import DeckDiscussionsPage from "./pages/DeckDiscussionsPage";
import ForumPage from "./pages/ForumPage";

Amplify.configure(awsconfig);
API.configure(awsconfig);

const router = createBrowserRouter([
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
        path: "/deckdiscussions",
        element: <DeckDiscussionsPage />
      },
      {
        path: "/forum",
        element: <ForumPage />
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
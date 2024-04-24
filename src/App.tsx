import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import "reflect-metadata";
import { GamePage } from 'presentation/pages';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <GamePage />
    ),
  },
]);

const App =() => {
  return (
    <RouterProvider router={router} />
  );
}

export default App;

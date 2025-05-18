import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './Home';
import Explore from './Explore';
import Journal from './Journal';
import Store from './Store';
import Cart from './Cart';
import Contact from './Contact';

import NotFound from './NotFound'; //Add to handle generic errors globally

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css'
import App from './App';


const router = createBrowserRouter([
  { path: "/",
    element: <App />,
    errorElement: <NotFound />, //Add global error handling
    children: [
      { path: "/", element: <Home /> },
      { path: "contact", element: <Contact />},
      { path: "explore", element: <Explore />},
      { path: "journal", element: <Journal />}, 
      { path: "store", element: <Store />},
      { path: "cart", element: <Cart />}, 
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
);

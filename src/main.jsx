import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {  createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import './index.css'
import App from './App.jsx'
import Home from './componets/home/Home.jsx';
import About from './componets/about/About.jsx';
import Store from './componets/store/Store.jsx';
import Books from './componets/Books/Books.jsx';
import BookDetail from './componets/Books/BookDetail.jsx';
import books from './componets/Books/booksdata.js';
import JoinForm from './componets/form/JoinForm.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
    children:[
         { index: true,
          element:<Home/>,
            },
         {path:'about',
          element:<About/>,
            },
         {path:'stores',
          element:<Store/>,
            },
            {
              path:'books',
              element:<Books/>,
              children:[{
                path:':id',
                element:<BookDetail books={books} />
              }]
            },
            {
              path:"join",
              element:<JoinForm/>,
            }
    ],
  }
]);




createRoot(document.getElementById('root')).render(
<StrictMode>
  <RouterProvider router={router} />
</StrictMode>,)

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


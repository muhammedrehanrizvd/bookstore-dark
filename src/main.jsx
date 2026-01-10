import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {  createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Provider } from 'react-redux';

import './index.css'
import App from './App.jsx'
import Home from './componets/pages/home/Home.jsx';
import About from './componets/pages/about/About.jsx';
import Store from './componets/pages/store/Store.jsx';
import Books from './componets/pages/Books/Books.jsx';
import BookDetail from './componets/pages/Books/BookDetail.jsx';
import books from './componets/pages/Books/booksdata.js';
import JoinForm from './componets/form/JoinForm.jsx';
// ✅ CORRECT
import { store } from "./App/ReduxStore.js";
import Cart from './componets/pages/cart/cart.jsx';

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
                element:<BookDetail books={books} />,
                 }]
            },
            {
              path:"join",
              element:<JoinForm/>,
            },
            {
             path:"cart",
              element:<Cart/>, 
            }
    ],
  }
]);




createRoot(document.getElementById('root')).render(
<StrictMode>
      <Provider store={store}>

  <RouterProvider router={router} />
      </Provider>
</StrictMode>,);


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {  createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Provider } from 'react-redux';

import './index.css'
import App from './App.jsx'
import Home from './components/pages/home/Home.jsx';
import About from './components/pages/about/About.jsx';
import Store from './components/pages/store/Store.jsx';
import Books from './components/pages/Books/Books.jsx';
import BookDetail from './components/pages/Books/BookDetail.jsx';

import Signup from './components/pages/authform/Signup.jsx';
import Login from './components/pages/authform/Login.jsx';
import ProtectedRoute from './components/pages/authform/ProtectedRoute.jsx';
import Dashboard from './components/pages/dashboard/Dashboard.jsx';

// ✅ CORRECT
import { store } from "./App/ReduxStore.js";
import Cart from './components/pages/cart/Cart.jsx';
import Sellbook from './components/pages/dashboard/Sellbook.jsx';
import Checkout from './components/pages/checkout/checkout.jsx';
import OrderSuccess from './components/pages/ordersuccess/OrderSuccess.jsx';

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
                element:<BookDetail  />,
                 }]
            },
            
            {
             path:"cart",
              element:<Cart/>, 
            },
            {
              path:"signup",
              element:<Signup/>
            },
            {
              path:"login",
              element:<Login/>
            },
            {
              path:'dashboard',
              element:<ProtectedRoute>
                <Dashboard/>
                </ProtectedRoute>,
                
            },
            {
              path:'sellbook',
              element:<Sellbook/>
            },
            {
              path:'checkout',
              element:<Checkout/>
            },
            {
              path:'order-success',
              element:<OrderSuccess/>
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


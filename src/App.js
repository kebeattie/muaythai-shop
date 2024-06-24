import './App.css';
import { getUser } from './api/user';

import Register from './routes/Register/Register';
import Home from './routes/Home/Home';
import Login from './routes/Login/Login';
import Product from './routes/Product/Product';
import Account from './routes/Account/Account';
import Cart from './routes/Cart/Cart';
import Checkout from './routes/Checkout/Checkout';
import Orders from './routes/Orders/Orders';
import Order from './routes/Order/Order';
import OrderConfirmed from './routes/OrderConfirmed/OrderConfirmed';
import { useEffect } from 'react';
import Header from './components/Header/Header';
import { getLogin } from './api/login';
import getProducts from './api/getProducts';
import ProductDetails from './routes/Product/ProductDetails';
import { getCart } from './api/cart';
import { calcTotal } from './utility/utility';
import { removeFromCart } from './api/cart';
import { createOrder } from './api/order';
import { useNavigate } from 'react-router-dom';

import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  json
} from "react-router-dom";
import PrivateRoute from './components/ProtectedRoute/ProtectedRoute';
import { useState } from 'react';



function App() {
  const [user, setUser] = useState(false);
  const [session, setSession] = useState({})
  const [userEmail, setUserEmail] = useState("");
  const [products, setProducts]= useState([]);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal]= useState(0);
  
  
  // // const getSession = async () => {
  // //   const results = await getLogin()
  // //   return results
  // }

  //Load all products from DB
  const loadProducts = async () => {
    setProducts(await getProducts());
    
  };
//Load all items in users cart
  const loadCart = async () => {
    setCart(await getCart(session.passport.user));
  };
//Calculate cart total
  const calcCartTotal = async () => {
    setCartTotal(await(calcTotal(await getCart(session.passport.user))));
  }

//Create order
  const createAndSaveOrder = async () => {
    createOrder(session.passport.user);
    
  }

//Remove item from cart
  const removeItemFromCart = async(id) => {
    removeFromCart(id);
    setCart(await getCart(session.passport.user));
    setCartTotal(await(calcTotal(await getCart(session.passport.user))));
  }

  //Set hook so that page re renders when session is changed
  useEffect(() => {
    if(JSON.stringify(session) === "{}") {
      setUserEmail("");
    } else {
      setUserEmail(session.passport.user);
      loadCart();
      calcCartTotal();
    };
    loadProducts();
  }, [session]);

 //Create a session with logged in users details and setUser to true to open protected routes
  const createSession = (session, user) => {
    setSession(session);
    setUser(user);
  }


 
  return (

    <div className="App">
      
      <Router>
      <Header user={user} cartTotal={cartTotal} />

        <Routes>
          {/* Unprotected routes */}
          <Route exact path='/' element={<Home products={products} session={session}/>} />
          <Route path="/registration" Component={Register} />
          <Route path="/login" element={<Login createSession={createSession} />} />
          <Route path=":productId" element={<ProductDetails products={products} session={session} loadCart={loadCart} calcCartTotal={calcCartTotal}/>} />
          <Route path="*" element={<p>404 - Not found</p>} />


          {/* Protected routes */}
          <Route path="/account"
            element={
              <PrivateRoute user={user} >
                <Account session={session} createSession={createSession}/>
              </PrivateRoute>
            }
          />

          <Route path="/cart"
            element={
              <PrivateRoute user={user}>
                <Cart session={session} cart={cart} cartTotal={cartTotal} products={products} removeItemFromCart={removeItemFromCart} createAndSaveOrder={createAndSaveOrder}/>
              </PrivateRoute>
            }
          />

          <Route path="/checkout"
            element={
              <PrivateRoute user={user}>
                <Checkout />
              </PrivateRoute>
            }
          />

          <Route path="/orders"
            element={
              <PrivateRoute user={user}>
                <Orders session={session} />
              </PrivateRoute>
            }
          />

          <Route path="/order/?orderId"
            element={
              <PrivateRoute user={user}>
                <Orders />
              </PrivateRoute>
            }
          />

          <Route path="/OrderConfirmed"
            element={
              <PrivateRoute user={user}>
                <OrderConfirmed />
              </PrivateRoute>
            }
          />

          


        </Routes>
      </Router>
    </div>
  );
}

export default App;

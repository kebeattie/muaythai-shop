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
import { useEffect } from 'react';
import Header from './components/Header/Header';
import { getLogin } from './api/login';
import getProducts from './api/getProducts';
import ProductDetails from './routes/Product/ProductDetails';

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
  
  // // const getSession = async () => {
  // //   const results = await getLogin()
  // //   return results
  // }

  const loadProducts = async () => {
    setProducts(await getProducts());
    
  }

  useEffect(() => {

    if(JSON.stringify(session) === "{}") {
      setUserEmail("");
    } else {
      setUserEmail(session.passport.user);
    };

    loadProducts();
  
   
   
  }, [session]);



  


  const createSession = (session, user) => {
    setSession(session);
    setUser(user);
  }

 

  return (

    <div className="App">
      
      <Router>
      <Header user={user} />

        <Routes>
          {/* Unprotected routes */}
          <Route exact path='/' element={<Home products={products}/>} />
          <Route path="/registration" Component={Register} />
          <Route path="/login" element={<Login createSession={createSession} />} />
          <Route path=":productId" element={<ProductDetails products={products}/>} />
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
                <Cart />
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
                <Orders />
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

          


        </Routes>
      </Router>
    </div>
  );
}

export default App;

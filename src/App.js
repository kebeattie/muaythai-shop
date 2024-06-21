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

import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import PrivateRoute from './components/ProtectedRoute/ProtectedRoute';
import { useState } from 'react';



function App() {
  const [user, setUser] = useState(false);
  const [session, setSession] = useState({})
  

  useEffect(() => {
    console.log("session has changed");
    console.log(session);
  }, [session])

  

  const createSession = (session) => {
    setSession(session);
    setUser(true);
  }

 

  return (

    <div className="App">
      
      <Router>
      <Header />

        <Routes>
          {/* Unprotected routes */}
          <Route exact path='/' Component={Home} />
          <Route path="/registration" Component={Register} />
          <Route path="/login" element={<Login createSession={createSession} />} />
          <Route path="/products/:productId" Component={Product} />
          <Route path="*" element={<p>404 - Not found</p>} />


          {/* Protected routes */}
          <Route path="/account"
            element={
              <PrivateRoute user={user} >
                <Account session={session}/>
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

          <Route path="/order/:orderId"
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

import './App.css';
import { getUser } from './api/user';

import Register from './routes/Register/Register';
import Home from './routes/Home/Home';
import Login from './routes/Login/Login';
import Product from './routes/Product/Product';

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Routes
} from "react-router-dom";



function App() {
  console.log(getUser("cart@email.com"))
  return (
    
    <div className="App">
      <Router>

        <Routes>
          <Route exact path='/' Component={Home}/>
          <Route path="/registration" Component={Register}/>
          <Route path="/login" Component={Login}/>
          <Route path="/products/:productId" Component={Product}/>

          </Routes>
      </Router>
    </div>
  );
}

export default App;

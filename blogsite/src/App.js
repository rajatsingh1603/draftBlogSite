import './App.css';
import Home from './Components/home/Home';
import Login from './Components/login/Login';
import Register from './Components/register/Register';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import { useState } from 'react';

function App() {
  const [user,setLoginUser] = useState({})
  return (
    <div className="App">
  <Router>
    <Switch>
      <Route exact path="/">
        {
          user && user._id ? <Home setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser}/>
        }
      </Route>
      
      <Route path="/login"><Login setLoginUser={setLoginUser} /></Route>
      <Route path="/register"><Register /></Route>
    </Switch>
  </Router>
    
    
    
    </div>
  );
}

export default App;

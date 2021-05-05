import SignUp from './components/user.js';
import Login from './components/login.js';
import UserDetails from './components/userDetails.js';
import Navbar from './components/nav.js';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Switch>          
          <Route path="/signup" component={SignUp}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/details" component={UserDetails}></Route>
          <Redirect to="/signup"></Redirect>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;

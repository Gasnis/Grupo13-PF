import './App.css';
import { Route } from "react-router-dom";
import Home from './components/Home/Home.jsx'
import Detail from './components/Details/Details.jsx'
import FormBar from './components/FormBar/FormBar.jsx';
import Login from './components/Login/Login.jsx';
import SignUp from './components/SignUp/SignUp';
import Profile from './components/Profile/Profile.jsx';
import axios from "axios";


axios.defaults.baseURL = "http://localhost:3001";

function App() {
  return (
      <div className="App">
        <Route exact path="/"> <Home/> </Route>
        <Route path="/detail/:id"> <Detail/> </Route>
        <Route path="/newplace"> <FormBar/> </Route>
        <Route path="/login"> <Login/> </Route>
        <Route path="/sign-up"> <SignUp/> </Route>
        <Route path="/profile"> <Profile/> </Route>
      </div>
  );
}

export default App;
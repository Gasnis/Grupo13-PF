import './App.css';
import { Route } from "react-router-dom";
import Home from './components/Home/Home.jsx'
import Detail from './components/Details/Details.jsx'
import FormBar from './components/FormBar/FormBar.jsx';
import Login from './components/Login/Login.jsx';
import SignUp from './components/SignUp/SignUp';
import Profile from './components/Profile/Profile.jsx';
import FormBook from './components/FormBook/FormBook.jsx';
import axios from "axios";
import Dashboard from './components/DashboardAdmin.jsx/Dashboard';
import BarOwnerPanel from './components/BarOwnerPanel/BarOwnerPanel.jsx';
import Password from './components/Password/Password';
import AboutUs from './components/About Us/AboutUs';

axios.defaults.baseURL = "https://grupo13-pf-production.up.railway.app/";


function App() {
  return (
      <div className="App">
        <Route exact path="/"> <Home/> </Route>
        <Route path="/detail/:id"> <Detail/> </Route>
        <Route path="/newplace"> <FormBar/> </Route>
        <Route path="/book"> <FormBook/> </Route>
        <Route path="/login"> <Login/> </Route>
        <Route path="/sign-up"> <SignUp/> </Route>
        <Route path="/profile"> <Profile/> </Route>
        <Route path="/admin"> <Dashboard/> </Route>
        <Route path="/bar-owner"> <BarOwnerPanel/> </Route>
        <Route path="/forgot-password"> <Password/> </Route>
        <Route path="/about-us"> <AboutUs/></Route>
        
      </div>
  );
}

export default App;
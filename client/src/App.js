import './App.css';
import { Route } from "react-router-dom";
import Home from './components/Home/Home.jsx'
import Detail from './components/Details/Details.jsx'
import FormBook from './components/FormBook/FormBook.jsx';
import FormBar from './components/FormBar/FormBar.jsx';
import Login from './components/Login/Login.jsx';
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

function App() {
  return (

      <div className="App">
        <Route path="/home"> <Home/> </Route>

        <Route path="/place/:id"> <Detail/> </Route>

        <Route path="/newplace"> <FormBar/> </Route>
        
        <Route path="/detail"> <Detail/> </Route>

        <Route path="/login"> <Login/> </Route>

        <Route path="/bookings"> <FormBook/> </Route>

      </div>
    
  );
}

export default App;
import './App.css';
import { Route } from "react-router-dom";
import Home from './components/Home/Home.jsx'
import Detail from './components/Details/Details.jsx'
import Form from './components/FormBook/FormBook.jsx';
import axios from "axios";
// axios.defaults.baseURL = 
axios.defaults.baseURL = "http://localhost:3001";

function App() {
  return (

      <div className="App">
        <Route path="/home"> <Home/> </Route>

        <Route path="/place/:id"> <Detail/> </Route>

        <Route path="/newplace"> <Form/> </Route>
        
        <Route path="/detail"> <Detail/> </Route>

      </div>
    
  );
}

export default App;
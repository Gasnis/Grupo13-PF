import './App.css';
import { Route } from "react-router-dom";
import Home from './components/Home';
import Detail from './components/Detail'
import Form from './components/Form';
import axios from "axios";
axios.defaults.baseURL = 

function App() {
  return (

      <div className="App">

        <Route path="/home"> <Home/> </Route>

        <Route path="/place/:id"> <Detail/> </Route>

        <Route path="/newplace"> <Form/> </Route>
        
        
      </div>
    
  );
}

export default App;
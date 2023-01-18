import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from '../Navbar/Navbar';

export default function Login() {

    const dispatch = useDispatch();
    const [login, setLogin] = useState({
        mail: "",
        password: ""
    })
    
    function handleChange(event) {
        setLogin({
            ...login,
            [event.target.name]: [event.target.value]
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        //que es lo que tengo que hacer aca? porque no hace un post 
        //cambia una propiedad de algun estado?
    }

    return (
        <div>
            <Navbar/>
            <h1>Ingresa</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text' 
                    placeholder='Mail'
                    value={login.mail}
                    name="mail"
                    onChange={handleChange}
                />
                <input
                    type='password' 
                    placeholder='Contraseña'
                    value={login.password}
                    name="password"
                    onChange={handleChange}
                />
                <button type="submit" id="loginButton">Ingresar</button>
                <Link to="/sign-up" >Todavia no tenes una cuenta?</Link>
            </form>
        </div>
    )
}
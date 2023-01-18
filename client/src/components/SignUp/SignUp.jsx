import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from '../Navbar/Navbar';

export default function SignUp() {

    const dispatch = useDispatch();

    const [signUp, setSignUp] = useState({
        name: "",
        mail: "",
        password: "",
        phoneNumber: "",
        birthday: "",
    })

    function handleChange(event) {
        setSignUp({
            ...signUp,
            [event.target.name]: [event.target.value]
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        //despachar action q postee el user
    }

    return (
        <div>
            <Navbar/>
            <h1>Registrate</h1>
            <form onSubmit={handleSubmit}>
            <input 
                type='text' 
                placeholder='Nombre'
                value={signUp.name}
                name="name"
                onChange={handleChange}
            /> 
            <input
                type='text' 
                placeholder='Mail'
                value={signUp.mail}
                name="mail"
                onChange={handleChange}
            />
            <input
                type='text' 
                placeholder='Contraseña'
                value={signUp.password}
                name="password"
                onChange={handleChange}
            />
            <input
                type='text' 
                placeholder='Teléfono'
                value={signUp.phoneNumber}
                name="phoneNumber"
                onChange={handleChange}
            />
            <input
                type='date' 
                placeholder='Fecha de cumpleaños'
                value={signUp.birthday}
                name="birthday"
                onChange={handleChange}
            />
            <h3>Sos dueño de un bar?</h3>
            <button type="submit" id="signUpButton">Registrarse</button>
            <h4>Ingresar con Google</h4>
            <Link to="/login" >Ya tenes una cuenta?</Link>
            
        </form>

        </div>
    )
}
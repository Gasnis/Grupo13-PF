import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import styles from './login.module.css';

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
            <div className={styles.loginContainer}>
                <h1 className={styles.title}>Ingresa</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.input}>
                    <input
                        type='text' 
                        placeholder='Mail'
                        value={login.mail}
                        name="mail"
                        onChange={handleChange}
                    />
                    </div>

                    <div className={styles.input}>
                    <input
                        type='password' 
                        placeholder='Contraseña'
                        value={login.password}
                        name="password"
                        onChange={handleChange}
                    />
                    </div>

                    <Link to="/home"><button type="submit" id="loginButton" className={styles.submitButton}>Ingresar</button></Link>
                    <Link to="/sign-up" >Todavia no tenes una cuenta?</Link>
                </form>
            </div>
        </div>
    )
}
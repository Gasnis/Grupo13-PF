import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import styles from '../SignUp/SignUp.module.css';

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
        //limpiar form
        //redirigir al home
    }

    return (
        <div className={styles.containerGeneral}>
            <Navbar/>
            <div className={styles.signUpContainer}>
                <h1 className={styles.title}>Registrate</h1>
                <form onSubmit={handleSubmit}>
                <div className={styles.input}>
                <input 
                    type='text' 
                    placeholder='Nombre'
                    value={signUp.name}
                    name="name"
                    onChange={handleChange}
                /> 
                </div>

                <div className={styles.input}>
                <input
                    type='text' 
                    placeholder='Mail'
                    value={signUp.mail}
                    name="mail"
                    onChange={handleChange}
                />
                </div>

                <div className={styles.input}>
                <input
                    type='text' 
                    placeholder='Contraseña'
                    value={signUp.password}
                    name="password"
                    onChange={handleChange}
                />
                </div>

                <div className={styles.input}>
                <input
                    type='text' 
                    placeholder='Teléfono'
                    value={signUp.phoneNumber}
                    name="phoneNumber"
                    onChange={handleChange}
                />
                </div>

                <div className={styles.input}>
                <input
                    type='date' 
                    placeholder='Fecha de cumpleaños'
                    value={signUp.birthday}
                    name="birthday"
                    onChange={handleChange}
                />
                </div>

                <h3>Sos dueño de un bar?</h3>
                <button type="submit" id="signUpButton" className={styles.submitButton}>Registrarse</button>
                <h4>Ingresar con Google</h4>
                <Link to="/login" >Ya tenes una cuenta?</Link>
                </form>
            </div>
        </div>
    )
}
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from "../../redux/actions"
import Navbar from '../Navbar/Navbar';
import styles from './login.module.css';
import { getUserByid } from '../../redux/actions';

export default function Login() {

    const dispatch = useDispatch();
    const history = useHistory();
    const [login, setLogin] = useState({
        id: "",
        password: ""
    })

    function handleChange(event) {
        setLogin({
            ...login,
            [event.target.name]: [event.target.value]
        })
    }


const handleSubmit = async (event) => {
    event.preventDefault();
        const usuarios = await dispatch(getUser()) 

    const currentUser = usuarios.payload.filter((user) => user.id === login.id[0])
    if (currentUser.length) {
        if(currentUser.password === login.password[2]) {
            dispatch(getUserByid(login.id))
            history.push("/")
            setLogin({
                id: "",
                password: ""
            })
        } else {alert('Contraseña incorrecta!')}
    } else {
        alert('El usuario no existe!')
    }
}

return (
    <div>
        <Navbar />
        <div className={styles.loginContainer}>
            <h1 className={styles.title}>Ingresa</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.input}>
                    <input
                        type='text'
                        placeholder='Mail'
                        value={login.id}
                        name="id"
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

                <button type="submit" id="loginButton" className={styles.submitButton}>Ingresar</button>

                <Link to="/sign-up" >Todavia no tenes una cuenta?</Link>
            </form>
        </div>
    </div>
)
}
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from "../../redux/actions"
import Navbar from '../Navbar/Navbar';
import styles from './login.module.css';

export default function Login() {

    const dispatch = useDispatch();
    const [login, setLogin] = useState({
        id: "",
        password: ""
    })

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    const users = useSelector((state) => state.allUsers)

    function handleChange(event) {
        setLogin({
            ...login,
            [event.target.name]: [event.target.value]
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
       
            

    //hacer el get user x id, si encuentra uno verificar q coincidan las contrasenas
    //si se comprueba q el usuario existe y la contra esta bien. Pasar a true algo q me permita acceder a ciertas funciones
    //redigir al home o al perfil
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

                <Link to="/home"><button type="submit" id="loginButton" className={styles.submitButton}>Ingresar</button></Link>
                <Link to="/sign-up" >Todavia no tenes una cuenta?</Link>
            </form>
        </div>
    </div>
)
}
import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUser } from '../../redux/actions';
import Navbar from '../Navbar/Navbar';
import styles from '../SignUp/SignUp.module.css';

export default function SignUp() {

    const dispatch = useDispatch();
    const history = useHistory();

    const [signUp, setSignUp] = useState({
        name: "",
        id: "",
        password: "",
        phone: "",
        birthday: "",
        city: "",
        image: ""
    })

    function handleChange(event) {
        setSignUp({
            ...signUp,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newUser = await dispatch(createUser(signUp)) 
        if (newUser.id) {
            alert('¡Usuario creado con éxito!')
            setSignUp({
                name: "",
                id: "",
                password: "",
                phone: "",
                birthday: "",
                city: "",
                image: ""
            })
            history.push('/home')
        } else {
            alert(newUser.response.data)
        }
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
                    value={signUp.id}
                    name="id"
                    onChange={handleChange}
                />
                </div>

                <div className={styles.input}>
                <input
                    type='password' 
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
                    value={signUp.phone}
                    name="phone"
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
                
                <div className={styles.input}>
                <input
                    type='text' 
                    placeholder='Ciudad'
                    value={signUp.city}
                    name="city"
                    onChange={handleChange}
                />
                </div>

                <div className={styles.input}>
                <input
                    type='text' 
                    placeholder='Foto de perfil'
                    value={signUp.image}
                    name="image"
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
import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUser , getUser} from '../../redux/actions';
import Navbar from '../Navbar/Navbar';
import styles from '../FormsStyles/forms.module.css';
import { validation } from './ValidationSignUp';

export default function SignUp(props) {

    const dispatch = useDispatch();
    const history = useHistory();


    const [signUp, setSignUp] = useState({
        name: "",
        id: "",
        password: "",
        phone: "",
        birthday: "",
        city: "",
    })

    const [errors, setErrors] = useState({
        id: "",
    })

    function handleChange(event) {
        setErrors(
                validation({
                        ...signUp,
                        [event.target.name]: event.target.value,
                    })
                );

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
            })
            history.push(`/profile`)
            dispatch(getUser(newUser.id))
        } else {
            alert(newUser.response.data)
        }
    }

    return (
        <div>
            <Navbar/>
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1 className={styles.title}>Registrate</h1>
                <form onSubmit={handleSubmit}>
                <div>
                <input 
                    type='text' 
                    placeholder='Nombre'
                    value={signUp.name}
                    name="name"
                    onChange={handleChange}
                    className={styles.input}
                /> 
                </div>

                <div >
                <input 
                    type='text' 
                    placeholder='Mail'
                    value={signUp.id}
                    name="id"
                    onChange={handleChange}
                    className={styles.input}
                />
                <div>{errors.id && <p>{errors.id}</p>}</div>
                </div>

                <div>
                <input
                    type='password' 
                    placeholder='Contraseña'
                    value={signUp.password}
                    name="password"
                    onChange={handleChange}
                    className={styles.input}
                />
                </div>

                <div>
                <input
                    type='text' 
                    placeholder='Teléfono'
                    value={signUp.phone}
                    name="phone"
                    onChange={handleChange}
                    className={styles.input}
                />
                </div>

                <div>
                <input
                    type='date' 
                    placeholder='Fecha de cumpleaños'
                    value={signUp.birthday}
                    name="birthday"
                    onChange={handleChange}
                    className={styles.input}
                />
                </div>
                
                <div>
                <input
                    type='text' 
                    placeholder='Ciudad'
                    value={signUp.city}
                    name="city"
                    onChange={handleChange}
                    className={styles.input}
                />
                </div>

                {/* <h3>Sos dueño de un bar?</h3> */}

                <div className={styles.linksContainer}>
                    <button 
                        type="submit" 
                        id="signUpButton"
                        disabled={!signUp.name || !signUp.id || !signUp.password || !signUp.phone || !signUp.city || !signUp.birthday || errors.id}
                        className={styles.submitButton}
                    >Registrarse</button>
                    {/* <h4>Ingresar con Google</h4> */}
                    <Link to="/login" >Ya tenes una cuenta?</Link>
                </div>

                </form>
            </div>
        </div>

        </div>
    )
}
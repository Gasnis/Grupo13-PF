import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, getUserByid } from '../../redux/actions';
import Navbar from '../Navbar/Navbar';
import styles from '../FormsStyles/forms.module.css';
import { validation } from './ValidationSignUp';
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script"
import { useEffect } from "react";
import emailjs from "@emailjs/browser"
import axios from 'axios';
import swal from "sweetalert";

function getMaxDate(minAge) {
    let today = new Date();
    let birthdate = new Date(today - minAge * 365 * 24 * 60 * 60 * 1000);
    let year = birthdate.getFullYear();
    let month = birthdate.getMonth() + 1;
    let day = birthdate.getDate();
    if (month < 10) {
        month = `0${month}`;
    }
    if (day < 10) {
        day = `0${day}`;
    }
    return `${year}-${month}-${day}`
}

export default function SignUp(props) {

    const dispatch = useDispatch();
    const history = useHistory();
    const checked = useSelector((state) => state.darkmode);


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
            swal("Usuario creado con exito!", {
                icon: "success",
            });
            setSignUp({
                name: "",
                id: "",
                password: "",
                phone: "",
                birthday: "",
                city: "",
            })
            await dispatch(getUserByid(newUser.id))
            history.push(`/profile`)
        } else {
            swal(newUser.response.data, {
                icon: "error",
            });
        }
    }


    const clientId = "553757960148-cs9ei96qh12hekvt7kecuo3fdf9d6ofp.apps.googleusercontent.com"

    useEffect(() => {
        const start = () => {
            gapi.auth2.init({
                clientId: clientId,
            })
        }
        gapi.load("client:auth2", start)
    }, [])

    const generarString = (longitud) => {
        let result = "";
        const abcABCNum = "a b c d e f g h i j k l m n o p q r s t u v w x y z A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 0 1 2 3 4 5 6 7 8 9".split(" "); // Espacios para convertir cara letra a un elemento de un array
        for (let i = 0; i <= longitud; i++) {
            const random = Math.floor(Math.random() * abcABCNum.length);
            result += abcABCNum[random]
        }
        return result;
    };

    const responseGoogle = async (respuesta) => {
        const userName = respuesta.profileObj.name;
        const userEmail = respuesta.profileObj.email;
        const userPassword = await generarString(10)

        let newUser = {
            name: userName,
            id: userEmail,
            password: userPassword,
            phone: "Completar",
            birthday: "1111-11-11",
            city: "Completar",
            image: respuesta.profileObj.imageUrl
        }
        const userCreated = await dispatch(createUser(newUser))

        if (userCreated.id) {
            alert('¡Usuario creado con éxito!')
            await dispatch(getUserByid(userCreated.id))
            history.push(`/profile`)
        } else {
            alert(userCreated.response.data)
        }
        // emailjs.sendForm("service_e1td9mr", "template_xya2hg7", newUser,"ra0ajVxUcOBmQYZPK")
        // .then(response => console.log(response))
        // .catch(error => console.log(error))

        var data = {
            service_id: 'service_e1td9mr',
            template_id: 'template_xya2hg7',
            user_id: 'ra0ajVxUcOBmQYZPK',
            template_params: {
                'userPassword': userPassword,
                'gmail': userEmail,
                'userName': userName,
            }
        };

        await axios.post('https://api.emailjs.com/api/v1.0/email/send', data)

    }
    return (
        <div>
            <Navbar />
            <div className={checked ? styles.container : styles.containerDark}>
                <div className={checked ? styles.formContainer : styles.formContainerDark}>
                    <h1 className={checked ? styles.title : styles.titleDark}>Registrate</h1>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div>
                            <input
                                type='text'
                                placeholder='Nombre'
                                value={signUp.name}
                                name="name"
                                onChange={handleChange}
                                className={checked ? styles.input : styles.inputDark}
                            />
                        </div>

                        <div >
                            <input
                                type='text'
                                placeholder='Mail'
                                value={signUp.id}
                                name="id"
                                onChange={handleChange}
                                className={checked ? styles.input : styles.inputDark}
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
                                className={checked ? styles.input : styles.inputDark}
                            />
                        </div>

                        <div>
                            <input
                                type='text'
                                placeholder='Teléfono'
                                value={signUp.phone}
                                name="phone"
                                onChange={handleChange}
                                className={checked ? styles.input : styles.inputDark}
                            />
                        </div>

                        <div>
                            <input
                                type='date'
                                placeholder='Fecha de cumpleaños'
                                value={signUp.birthday}
                                max={getMaxDate(15)}
                                name="birthday"
                                onChange={handleChange}
                                className={checked ? styles.input : styles.inputDark}
                            />
                        </div>

                        <div>
                            <input
                                type='text'
                                placeholder='Ciudad'
                                value={signUp.city}
                                name="city"
                                onChange={handleChange}
                                className={checked ? styles.input : styles.inputDark}
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
                            <GoogleLogin
                                clientId={clientId}
                                buttonText="Registrarse con Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={"single_host_origin"}
                            />
                            <Link to="/login" className={checked ? styles.link : styles.linkDark}>Ya tenes una cuenta?</Link>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}
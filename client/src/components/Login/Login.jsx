import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/actions";
import Navbar from "../Navbar/Navbar";
import styles from "../FormsStyles/forms.module.css";
import { getUserByid } from "../../redux/actions";
import GoogleLogin from "react-google-login";
import {gapi} from "gapi-script"
import { useEffect } from "react";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const checked = useSelector((state) => state.darkmode);

  const [login, setLogin] = useState({  // 
    id: "",
    password: "",
    
  });

  function handleChange(event) {
    setLogin({
      ...login,
      [event.target.name]: [event.target.value],
    });
  }

  const handleSubmit = async (event) => {
    console.log(event.target.name)

    event.preventDefault();
    const usuarios = await dispatch(getUser());
    const currentUser = usuarios.payload.filter(
      (user) => user.id === login.id[0]
    );
    if (currentUser.length) {
      if (currentUser[0].password === login.password[0]) {
        dispatch(getUserByid(login.id));
        history.push("/");
        setLogin({
          id: "",
          password: "",
        });
      } else {
        alert("El usuario o contraseña es incorrecto");
      }
    } else {
      alert("El usuario o contraseña es incorrecto");
    }
  }
  const clientId = "553757960148-cs9ei96qh12hekvt7kecuo3fdf9d6ofp.apps.googleusercontent.com"

  useEffect(() => {
    const start = () =>{
        gapi.auth2.init({
            clientId: clientId,
        })
    }
    gapi.load("client:auth2", start)
  }, [])

    const responseGoogle = async (respuesta) => {
      console.log(respuesta)
      const userLoginId = respuesta.profileObj.email
      const usuarios = await dispatch(getUser());
      const currentUser = usuarios.payload.filter((user) => user.id === userLoginId)
      if (currentUser.length) {
        dispatch(getUserByid(userLoginId))
        history.push("/");
      } else {
        alert("Debes registrarte primero");
        history.push("/sign-up");
      }
    }

  return (
    <div>
      <Navbar />
      <div className={checked ? styles.containerLogin : styles.containerLoginDark}>
        <div className={checked ? styles.formContainer : styles.formContainerDark}>
          <h1 className={checked ? styles.title : styles.titleDark}>Ingresa</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                className={checked ? styles.input : styles.inputDark}
                type="text"
                placeholder="Mail"
                value={login.id}
                name="id"
                onChange={handleChange}
              />
            </div>

            <div>
              <input
                className={checked ? styles.input : styles.inputDark}
                type="password"
                placeholder="Contraseña"
                value={login.password}
                name="password"
                onChange={handleChange}
              />
            </div>

            <div className={styles.linksContainer}>
              <button
                name="where"
                type="submit"
                id="loginButton"
                className={checked ? styles.submitButton : styles.submitButtonDark}
                disabled={!login.id || !login.password}
              >
                Ingresar
              </button>

              <GoogleLogin
                name="google"
                clientId={clientId}
                buttonText="Ingresar con Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />

              <Link to="/sign-up"  className={checked ? styles.link : styles.linkDark}>Todavia no tenes una cuenta?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

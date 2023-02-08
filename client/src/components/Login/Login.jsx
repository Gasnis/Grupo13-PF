import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../redux/actions";
import Navbar from "../Navbar/Navbar";
import styles from "../FormsStyles/forms.module.css";
import { getUserByid } from "../../redux/actions";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script"
import { useEffect } from "react";
import swal from "sweetalert";
import { HiOutlineEye } from "react-icons/hi2";
import { HiOutlineEyeSlash } from "react-icons/hi2";


export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const checked = useSelector((state) => state.darkmode);
  const currentProfile = useSelector((state) => state.profile);
  const [login, setLogin] = useState({  // 
    id: "",
    password: "",
  });

  const [passwordType, setPasswordType] = useState("password");

  const seePassword = (event) => {
    event.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  }

  function handleChange(event) {
    setLogin({
      ...login,
      [event.target.name]: [event.target.value],
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const usuarios = await dispatch(getUser());
    const currentUser = usuarios.payload.filter(
      (user) => user.id === login.id[0]
    );
    if (currentUser.length) {
      if (currentUser[0].ban === true) {
        logout()
        setLogin({
          id: "",
          password: "",
        });
        swal("El usuario ha sido BANEADO", {
          icon: "error",
          className: styles.swal,
        });
      } else {
        if (currentUser[0].password === login.password[0]) {
          dispatch(getUserByid(login.id));
          history.push("/");
          setLogin({
            id: "",
            password: "",
          });
        } else {
          swal("El usuario o contraseña es incorrecto", {
            icon: "error",
            className: styles.swal,
          });
        }
      }
    } else {
      swal("El usuario o contraseña es incorrecto", {
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

  const responseGoogle = async (respuesta) => {
    const userLoginId = respuesta.profileObj.email
    const usuarios = await dispatch(getUser());
    const currentUser = usuarios.payload.filter((user) => user.id === userLoginId)

    if (currentUser.length) {
      if (currentUser[0].ban === true) {
        logout()
        setLogin({
          id: "",
          password: "",
        });
        swal("El usuario ha sido baneado", {
          icon: "error",
        });
      } else {
        await dispatch(getUserByid(userLoginId))
        history.push("/");
      }
    } else {
      swal("Debes registrarte primero", {
        icon: "error",
      });
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

            <div className={checked ? styles.passwordInputCont : styles.passwordInputContDark}>
              <input
                className={styles.passwordInput}
                type={passwordType}
                placeholder="Contraseña"
                value={login.password}
                name="password"
                onChange={handleChange}
              />
              <div>
                <button onClick={seePassword} className={styles.eyes}>
                  {passwordType === "password" ?
                    <HiOutlineEye />
                    : <HiOutlineEyeSlash />}
                </button>
              </div>
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

              <Link to="/forgot-password" className={checked ? styles.link : styles.linkDark}>Olvidé mi contraseña</Link>
              <Link to="/sign-up" className={checked ? styles.link : styles.linkDark}>Todavia no tenes una cuenta?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

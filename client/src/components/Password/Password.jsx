import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import styles from "../FormsStyles/forms.module.css";
import { getUserId } from "../../redux/actions";
import axios from "axios";

export default function Password() {
  const dispatch = useDispatch();
  const history = useHistory();
  const checked = useSelector((state) => state.darkmode);

  const [login, setLogin] = useState({  // 
    id: "",
    
  });

  function handleChange(event) {
    setLogin({
      ...login,
      [event.target.name]: [event.target.value],
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const user = await getUserId(login.id[0])
   
    if(user.data?.id){
      var data = {
        service_id: 'service_e1td9mr',
        template_id: 'template_svs0o8i',
        user_id: 'ra0ajVxUcOBmQYZPK',
        template_params: {
            'userPassword': user.data.password,
            'gmail': user.data.id,
            'userName': user.data.name,
        }
      };
    
      await axios.post('https://api.emailjs.com/api/v1.0/email/send', data)
      history.push("/login")

    }
    else{
      alert('Este usuario no existe en la base de datos, por favor registrate')
      history.push(`/sign-up`);
    }

  }

  return (
    <div>
      <Navbar />
      <div className={checked ? styles.containerLogin : styles.containerLoginDark}>
        <div className={checked ? styles.formContainer : styles.formContainerDark}>
          <Link to="/login"  className={checked ? styles.link : styles.linkDark}> 	« volver </Link>
          <h1 className={checked ? styles.title : styles.titleDark}>Ingresa tu correo</h1>
          <h4>Para que podamos enviarte tu contraseña</h4>
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

            <div className={styles.linksContainer}>
              <button
                name="where"
                type="submit"
                id="loginButton"
                className={checked ? styles.submitButton : styles.submitButtonDark}
                disabled={!login.id}
              >
                Recuperar contraseña
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

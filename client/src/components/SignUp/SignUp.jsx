import React from 'react';
import {Link} from 'react-router-dom';

export default function SignUp() {

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
        <input 
            type='text' 
            placeholder='Nombre'
        /> 
        <input
             type='text' 
             placeholder='Mail'
        />
        <input
             type='text' 
             placeholder='Contraseña'
        />
        <input
             type='text' 
             placeholder='Teléfono'
        />
        <input
             type='date' 
             placeholder='Fecha de cumpleaños'
        />
        <button>Registrarse</button>
        <h3>Ingresar con Google</h3>
        <Link to="/login" >Ya tenes una cuenta?</Link>
        
    </form>
    )
}
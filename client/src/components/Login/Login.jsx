import React from 'react';
import {Link} from 'react-router-dom';

export default function Login() {
    
    function handleSubmit(event) {
        event.preventDefault();

    }

    return (
        <form onSubmit={handleSubmit}>
             <input
                 type='text' 
                 placeholder='Mail'
            />
            <input
                 type='text' 
                 placeholder='Contraseña'
            />
            <button>Ingresar</button>
            <h3>Ingresar con Google</h3>
            <Link to="/sign-up" >Todavia no tenes una cuenta?</Link>
        </form>
    )
}
import React, {useState} from 'react';
import { useDispatch} from 'react-redux';
import Navbar from '../Navbar/Navbar';
import { createBook } from '../../redux/actions';
import { useHistory } from 'react-router-dom';
import {style} from "../SignUp/SignUp"

function getNum (date, string) {
    switch(string){
        case "Month":
            let month = date.getMonth()+1;
            if(month<10){
                month = "0"+month
            }
            return month
        case "Day":
            let day = date.getDate();
            if(day<10){
                day = "0"+day
            }
            return day
        default:
            return string;
    }
}

function validate (input) {
    let errors = {}
    if (!input.name.length) errors.name = "Debes escribir un nombre";
    if (!input.personQuantity.length) errors.personQuantity = "Debes escribir la cantidad de personas";
    if (parseInt(input.personQuantity)>10) errors.personQuantity = "Máximo 10 personas";
    if (parseInt(input.personQuantity)<1) errors.personQuantity = "Debes ingresar un número mayor a 1";
    return errors;
}

export default function SignUp(props) {
    const localId = props.localId;
    const dispatch = useDispatch();
    const history = useHistory();
    const date = new Date();
    const [reserved, setReserved] = useState(false) //se cambia cuando se completa la reserva para renderizar un mensaje al usuario antes de ir al home
    const [booking, setBooking] = useState({
        name: "",
        reservedDate: "",
        personQuantity: "",
        discountCode: "",
    })
    const [errors, setErrors] = useState({
        name:"",
        personQuantity:"",
    })
    //valor que se pasa a la propiedad "disabled" del button
    //solo es "false" cuando no existen errores ni campos vacíos (date)
    const disabled = errors.name||errors.personQuantity||!booking.reservedDate 

    function handleChange(event) {
        setErrors(validate({
            ...booking, 
            [event.target.name]: event.target.value
        }))
        setBooking({
            ...booking,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(createBook({
            ...booking,
            localId
        }))
        // limpiar form
        setBooking({
            name: "",
            reservedDate: "",
            personQuantity: "",
            discountCode: "",
        })
        //setea reserved en true para mostrar un mensaje
        // redirigir al home o a tus reservas
        setReserved(true);
        setTimeout(() => {
            history.push('/')
        }, 2000); 
    }

    return (
        <div className={style.containerGeneral}>
            <Navbar/>
            <div className={style.signUpContainer}>
                <h1 className={style.title}>Hace tu reserva</h1>
                <form onSubmit={handleSubmit}>
                <div className={style.input}>
                <input 
                    type='text' 
                    placeholder='Nombre'
                    value={booking.name}
                    name="name"
                    onChange={handleChange}
                /> 
                {errors.name ? <span>{errors.name}</span> : null}
                </div>

                <div className={style.input}>
                <input
                    type='date' 
                    min={`${date.getFullYear()}-${getNum(date,"Month")}-${getNum(date,"Day")}`}
                    max={`${date.getFullYear()}-${getNum(date,"Month")}-${getNum(date,"Day")}`} //mientras implementamos reservas posteriores
                    placeholder='Mail'
                    value={booking.reservedDate}
                    name="reservedDate"
                    onChange={handleChange}
                />
                </div>

                <div className={style.input}>
                <input
                    type='number'
                    min="1"
                    max="10"
                    placeholder='Cantidad de personas'
                    value={booking.personQuantity}
                    name="personQuantity"
                    onChange={handleChange}
                />
                {errors.personQuantity ? <span>{errors.personQuantity}</span> : null}
                </div>

                <div className={style.input}>
                <input
                    type='text' 
                    placeholder='discountCode'
                    value={booking.discountCode}
                    name="discountCode"
                    onChange={handleChange}
                />
                </div>

                <button disabled={disabled} type="submit" id="signUpButton" className={style.submitButton}>Reservar</button>
                </form>
                {reserved ? <h3 className={style.title}>Successful booking</h3> : null}
            </div>
        </div>
    )
}
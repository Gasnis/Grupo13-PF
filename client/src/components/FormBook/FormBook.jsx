import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import styles from './formbook.css';

export default function SignUp() {

    const dispatch = useDispatch();

    const [booking, setBooking] = useState({
        name: "",
        date: "",
        people: "",
        discountCode: "",
    })

    function handleChange(event) {
        setBooking({
            ...booking,
            [event.target.name]: [event.target.value]
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        //despachar action q postee la reserva
        //limpiar form
        //redirigir al home o a tus reservas
    }

    return (
        <div className={styles.containerGeneral}>
            <Navbar/>
            <div className={styles.signUpContainer}>
                <h1 className={styles.title}>Hace tu reserva</h1>
                <form onSubmit={handleSubmit}>
                <div className={styles.input}>
                <input 
                    type='text' 
                    placeholder='Nombre'
                    value={booking.name}
                    name="name"
                    onChange={handleChange}
                /> 
                </div>

                <div className={styles.input}>
                <input
                    type='date' 
                    placeholder='Mail'
                    value={booking.date}
                    name="date"
                    onChange={handleChange}
                />
                </div>

                <div className={styles.input}>
                <input
                    type='number'
                    min="2"
                    max="10"
                    placeholder='Cantidad de personas'
                    value={booking.people}
                    name="people"
                    onChange={handleChange}
                />
                </div>

                <div className={styles.input}>
                <input
                    type='text' 
                    placeholder='discountCode'
                    value={booking.discountCode}
                    name="discountCode"
                    onChange={handleChange}
                />
                </div>

                <button type="submit" id="signUpButton" className={styles.submitButton}>Hace tu reserva</button>
                </form>
            </div>
        </div>
    )
}
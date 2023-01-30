import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import { bookPersist, createBook } from '../../redux/actions';
import { useHistory, useLocation } from 'react-router-dom';
import styles from '../FormsStyles/forms.module.css';
import { useEffect } from 'react';
import axios from 'axios';


function getNum(date, string) {


    switch (string) {
        case "Month":
            let month = date.getMonth() + 1;
            if (month < 10) {
                month = "0" + month
            }
            return month
        case "Day":
            let day = date.getDate();
            if (day < 10) {
                day = "0" + day
            }
            return day
        default:
            return string;
    }
}

function validate(input) {
    let errors = {}
    if (!input.name?.length) errors.name = "Debes escribir un nombre"; //puede que el signo ? rompa la validacion 
    if (!input.personQuantity?.length) errors.personQuantity = "Debes escribir la cantidad de personas"; //puede que el signo ? rompa la validacion 
    if (parseInt(input.personQuantity) > 10) errors.personQuantity = "Máximo 10 personas";
    if (parseInt(input.personQuantity) < 1) errors.personQuantity = "Debes ingresar un número mayor a 1";
    if (!input.userId) errors.userId = "Debes loguearte para realizar una reserva"
    return errors;
}

export default function SignUp(props) {
    const location = useLocation()


    const pay = location.search.includes("approved")
    const rejectedPay = location.search.includes("rejected")



    const localId = useSelector(state => state.placeDetail.id);
    const price = useSelector(state => state.placeDetail.bookPrice)


    const dispatch = useDispatch();
    const history = useHistory();
    const { profile, book } = useSelector(state => state)
    const date = new Date();
    // const [reserved, setReserved] = useState(false) //se cambia cuando se completa la reserva para renderizar un mensaje al usuario antes de ir al home
    const [booking, setBooking] = useState({
        name: book.name,
        reservedDate: book.reservedDate,
        personQuantity: book.personQuantity,
        discountCode: book.discountCode,
        userId: profile.id,
        priceTotal: book.priceTotal
    })
    const [errors, setErrors] = useState({
        name: "",
        personQuantity: "",
    })
    console.log(booking)
    //valor que se pasa a la propiedad "disabled" del button
    //solo es "false" cuando no existen errores ni campos vacíos (date)
    const disabled = errors.name || errors.personQuantity || !booking.reservedDate || !profile

    useEffect(() => {
        if (!profile.id) {
            history.push("/login")
        }
    }, [])

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
    if (pay) {
        const handleSubmit = async (event) => {
            console.log("second", booking)

            const newBooking = await dispatch(createBook({
                ...booking,
                localId
            }))

            if (newBooking.id) {
                setBooking({
                    name: "",
                    reservedDate: "",
                    personQuantity: "",
                    discountCode: "",
                    //userId?
                })
                // setReserved(true);
                // setTimeout(() => {
                //     history.push('/')
                // }, 2000); 
                dispatch(bookPersist({}))
                history.push(`/profile`)
            } else {
                // alert(newBooking.response.data)
            }
        }
        handleSubmit()

    }

    if (rejectedPay) {
        alert("pago rechazado")
        dispatch(bookPersist({}))
        history.push("/book")

    }

    const handleSubmit = async (event) => {

        event.preventDefault();

        dispatch(bookPersist({
            ...booking,
            localId
        }))
        const data = await axios.post("/payment/generate-link", {

            "personQuantity": 1,
            "priceTotal": 1000

        });
        const payUrl = data.data.body.init_point

        window.location.replace(payUrl)





        // const paylink = await dispatch(getPaylink())

    }

    const goToDetails = (e) => {
        history.push(`/detail/${localId}`)
    }

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.formContainer}>
                    <h1 className={styles.title}>Hace tu reserva</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input className={styles.input}
                                type='text'
                                placeholder='Nombre'
                                value={booking.name}
                                name="name"
                                onChange={handleChange}
                            />
                            {errors.name ? <span>{errors.name}</span> : null}
                        </div>

                        <div>
                            <input className={styles.input}
                                type='date'
                                min={`${date.getFullYear()}-${getNum(date, "Month")}-${getNum(date, "Day")}`}
                                max={`${date.getFullYear()}-${getNum(date, "Month")}-${getNum(date, "Day")}`} //mientras implementamos reservas posteriores
                                placeholder='Mail'
                                value={booking.reservedDate}
                                name="reservedDate"
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <input className={styles.input}
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

                        <div>
                            <input className={styles.input}
                                type='text'
                                placeholder='discountCode'
                                value={booking.discountCode}
                                name="discountCode"
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.linksContainer}>
                            <button disabled={disabled} type="submit" id="signUpButton" className={styles.submitButton}>Reservar</button>
                            {localId ? <button className={styles.volverButton} onClick={goToDetails}>Volver</button> : null}
                        </div>
                    </form>
                    {errors.userId ? <span>{errors.userId}</span> : null}

                    {/* {reserved ? <h3 className={styles.title}>Successful booking</h3> : null} */}
                </div>
            </div>
        </>
    )
}
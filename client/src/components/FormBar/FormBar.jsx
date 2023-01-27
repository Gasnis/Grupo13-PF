import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import { createPlace } from '../../redux/actions';
import styles from '../FormBar/FormBar.module.css';
import { validation } from './ValidationFormBar';

export default function CreateLocal() {
    const dispatch = useDispatch();
    const history = useHistory();
    const profile = useSelector(state => state.profile)
    const weekDays = ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"]
    const horaApertura = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00']
    const horaCierre = ['00:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00']
    const [scheduleArray, setScheduleArray] = useState({
        days: [],
        open: "",
        close: ""
    })

    const [local, setLocal] = useState({
        userId: profile.id,
        name: "",
        image: "",
        location: "",
        menu: "",
        phone: "",
        capacity: "",
        schedule: [],
        ageRange: [],
        category: '',
        event: false,
        petFriendly: false,
        bookPrice: "",
        available: true,
    })

    const [errors, setErrors] = useState({
        image: "",
    })

    const handleChange = (event) => {
        setErrors(
            validation({
                ...local,
                [event.target.name]: event.target.value
            })
        );
        setLocal({
            ...local,
            [event.target.name]: event.target.value
        })
    }

    const handleHour = (event) => {
        setScheduleArray({
            ...scheduleArray,
            [event.target.name]: event.target.value
        })
    }

    const handleAge = (event) => {
        setLocal({
            ...local,
            ageRange: [event.target.value]
        })
    }

    const handleCategories = (event) => {
        setLocal({
            ...local,
            category: event.target.value
        })
    }

    const handlePetFriendly = (event) => {
        if (!local.petFriendly) {
            setLocal({
                ...local,
                petFriendly: true
            })
        }
    }

    const handleEvent = (event) => {
        if (!local.event) {
            setLocal({
                ...local,
                event: true
            })
        }
    }

    const handleWeekdays = (event) => {
        if (event.target.checked){
            setScheduleArray({
                ...scheduleArray,
                days:[...scheduleArray.days,event.target.name]
            })
        }
        else{
            let filterDays = scheduleArray.days.filter(day=>day!==event.target.name)
            setScheduleArray({
                ...scheduleArray,
                days:filterDays
            })
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newLocal = await dispatch((createPlace({
            ...local,
            schedule: [...scheduleArray.days, scheduleArray.open, scheduleArray.close]
        })));
        if (newLocal.id) {
            history.push(`/detail/${newLocal.id}`)
        } else {
           alert(newLocal.response.data)
        }
    }


    return (
        <div className={styles.formBarContainer}>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.formContainer}>
                    <h1 className={styles.title}>Registra tu local</h1>
                    <form onSubmit={handleSubmit}>
                        <div >
                            <input
                                type='text'
                                placeholder='Nombre del local'
                                value={local.name}
                                name="name"
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>

                        <div >
                            <input
                                type='url'
                                placeholder='Imagen/logo'
                                value={local.image}
                                name="image"
                                onChange={handleChange}
                                className={styles.input}
                            />
                            {errors.image && <p>{errors.image}</p>}
                        </div>

                        <div >
                            <input
                                type='text'
                                placeholder='Direccion'
                                value={local.location}
                                name="location"
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>

                        <div >
                            <input
                                type='text'
                                placeholder='Menu'
                                value={local.menu}
                                name="menu"
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>

                        <div >
                            <input
                                type='text'
                                placeholder='Numero de telefono'
                                value={local.phone}
                                name="phone"
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>

                        <div >
                            <input
                                type='number'
                                placeholder='Capacidad'
                                value={local.capacity}
                                name="capacity"
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.scheduleContainer} >
                            <h4 >Horarios</h4>
                            <div className={styles.weekHours}>
                                <div className={styles.weekdaysContainer}>
                                {weekDays.map(day=>(
                                        <label key={day} className={styles.label}>
                                            <input
                                                type="checkbox"
                                                name={day}
                                                value={day}
                                                onChange={handleWeekdays}
                                            />
                                            {day}
                                        </label>
                                    ))}
                                </div>

                                <div className={styles.hoursContainer}>
                                    <div>
                                        <label className={styles.label}>Desde:</label>
                                        <select name='open' onChange={handleHour} className={styles.selectHours}>
                                            <option>Horario de apertura</option>
                                            {horaApertura.map((hora) => {
                                                return (
                                                    <option key={hora}>{hora}</option>
                                                )
                                            })}
                                        </select>
                                    </div>

                                    <div>
                                        <label className={styles.label}>Hasta:</label>
                                        <select name='close' onChange={handleHour} className={styles.selectHours}>
                                            <option> Horario de cierre</option>
                                            {horaCierre.map((hora) => {
                                                return (
                                                    <option key={hora}>{hora}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <h4>¿Tu local tiene restricciones por edad?</h4>
                        <select name="ageRange" onChange={handleAge} className={styles.select}>
                            <option value="" hidden>Selecciona las edades</option>
                            <option value="+18">+18</option>
                            <option value="+21">+21</option>
                            <option value="Sin restricciones">Sin restricciones</option>
                        </select>

                        <div >
                            <h4>Categoria</h4>
                            <select name="category" onChange={handleCategories} className={styles.select}>
                                <option value="" hidden>Selecciona el tipo de local que mas coincida con el tuyo</option>
                                <option value="disco">Discoteca</option>
                                <option value="bar">Bar</option>
                                <option value="pub">Pub</option>
                            </select>
                        </div>

                        <div >
                            <input
                                type='number'
                                placeholder='Precio de la reserva'
                                value={local.bookPrice}
                                name="bookPrice"
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.petFriendlyEventos}>
                            <div >
                                <label>
                                    En tu local se realizan eventos(ej: shows en vivo)
                                    <input
                                        type='checkbox'
                                        value={local.event}
                                        name="event"
                                        onChange={handleEvent}
                                    />
                                </label>
                            </div>

                            <div >
                                <label>Tu local es pet friendly?
                                    <input
                                        type='checkbox'
                                        value={local.petFriendly}
                                        name="petFriendly"
                                        onChange={handlePetFriendly}
                                    />
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            id="localButton"
                            className={styles.registrarButton}
                            disabled={!local.bookPrice || !local.ageRange || !local.capacity || !local.category || !local.image || !local.location || !local.menu || !local.name || !local.phone || !local.schedule || errors.image}
                        >Registrar local</button>
                    </form>
                </div>

            </div>

        </div>
    )
}
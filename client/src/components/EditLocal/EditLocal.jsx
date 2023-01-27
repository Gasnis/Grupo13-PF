import React from "react";
import styles from "./editLocal.module.css";
import {useDispatch} from "react-redux";
import { updatePlace } from "../../redux/actions";
import { useState } from "react";

export default function EditLocal (props) {
    const localToEdit = props.local;
    const dispatch = useDispatch();
    const [local, setLocal] = useState({
        ...props.localToEdit
    });






    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updatePlace(localToEdit.id, local))
    }

    return (
        <div>
            {/* <div className={styles.container}>
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
                                    <label className={styles.label}>
                                        <input
                                            type="checkbox"
                                            name="lunes"
                                            value="lunes"
                                            onChange={handleWeekdays}
                                        ></input>
                                        Lunes
                                    </label>

                                    <label className={styles.label}>
                                        <input
                                            type="checkbox"
                                            name="martes"
                                            value="martes"
                                            onChange={handleWeekdays}
                                        ></input>
                                        Martes
                                    </label>

                                    <label className={styles.label}>
                                        <input
                                            type="checkbox"
                                            name="miercoles"
                                            value="miercoles"
                                            onChange={handleWeekdays}
                                        ></input>
                                        Miercoles</label>

                                    <label className={styles.label}>
                                        <input
                                            type="checkbox"
                                            name="jueves"
                                            value="jueves"
                                            onChange={handleWeekdays}
                                        ></input>
                                        Jueves</label>

                                    <label className={styles.label}>
                                        <input
                                            type="checkbox"
                                            name="viernes"
                                            value="viernes"
                                            onChange={handleWeekdays}
                                        ></input>
                                        Viernes</label>

                                    <label className={styles.label}>
                                        <input
                                            type="checkbox"
                                            name="sabado"
                                            value="sabado"
                                            onChange={handleWeekdays}
                                        ></input>
                                        Sabado</label>

                                    <label className={styles.label}>
                                        <input
                                            type="checkbox"
                                            name="domingo"
                                            value="domingo"
                                            onChange={handleWeekdays}
                                        ></input>
                                        Domingo</label>
                                </div>

                                <div className={styles.hoursContainer}>
                                    <div>
                                        <label className={styles.label}>Desde:</label>
                                        <select onChange={handleSchedule} className={styles.selectHours}>
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
                                        <select onChange={handleSchedule} className={styles.selectHours}>
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
                        >Guardar</button>
                        <button onClick={props.handleCancel}>Cancelar</button>
                    </form>
                </div>

            </div> */}

        </div>
    )
}
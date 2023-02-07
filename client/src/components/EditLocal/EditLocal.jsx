import React from "react";
import styles from "./editLocal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserByid, updatePlace, getCities, getStates } from "../../redux/actions";
import { useState } from "react";
import swal from "sweetalert"
import { useEffect } from "react";
import { containsName } from "../FormBar/FormBar";

const validate = (local) => {
    let errors = {};
    if (!local.name.length) errors.name = "Debes escribir un nombre.";
    if (!local.location.length) errors.location = "Debes escribir una dirección.";
    if (local.phone < 0 || !local.phone) errors.phone = "Debes escribir un número de teléfono.";
    if (local.bookPrice < 0 || !local.bookPrice) errors.bookPrice = "Escribe el valor de la reserva en tu local.";
    if (local.capacity < 0 || !local.capacity) errors.capacity = "Escribe la capacidad o aforo de tu local.";
    if (!local.image.length) errors.image = "Debes pegar una URL de una imagen";
    return errors;
}

export default function EditLocal(props) {
    const { localToEdit, userId } = props;

    const dispatch = useDispatch();
    const checked = useSelector((state) => state.darkmode);

    const [local, setLocal] = useState({
        ...localToEdit,
        userId
    });

    const [errors, setErrors] = useState({
        name: "",
        image: "",
        location: "",
        phone: "",
        capacity: "",
        bookPrice: "",
        city: "",
        state: "",
    });
    const [checkboxState, setCheckboxState] = useState({
        lunes: localToEdit.schedule?.includes("lunes"),
        martes: localToEdit.schedule?.includes("martes"),
        miercoles: localToEdit.schedule?.includes("miercoles"),
        jueves: localToEdit.schedule?.includes("jueves"),
        viernes: localToEdit.schedule?.includes("viernes"),
        sabado: localToEdit.schedule?.includes("sabado"),
        domingo: localToEdit.schedule?.includes("domingo"),
        event: localToEdit.event,
        petFriendly: localToEdit.petFriendly,
        available: localToEdit.available
    })
    const [scheduleArray, setScheduleArray] = useState({
        days: [...local.schedule.slice(0, local.schedule.length - 2)],
        open: local.schedule[local.schedule.length - 2],
        close: local.schedule[local.schedule.length - 1]
    }
    )

    
    const weekDays = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"]
    const horaApertura = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00']
    const horaCierre = ['00:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00'];
    const categories = ["disco", "bar", "pub"];
    const ageRanges = ["+18", "+21", "Sin restricciones"];
    const indexApertura = horaApertura.indexOf(scheduleArray.open);
    const indexCierre = horaCierre.indexOf(scheduleArray.close);
    const indexCategory = categories.indexOf(local.category);
    const indexAgeRange = ageRanges.indexOf(local.ageRange);
    setTimeout(() => {
        let apertura = document.querySelector("#apertura");
        let cierre = document.querySelector("#cierre");
        let category = document.querySelector("#category");
        let ageRange = document.querySelector("#ageRange");
        apertura.selectedIndex = indexApertura + 1;
        cierre.selectedIndex = indexCierre + 1;
        category.selectedIndex = indexCategory + 1;
        ageRange.selectedIndex = indexAgeRange + 1;
    }, 1);
    const cities = useSelector(state=>state.cities)
    const [citiesToShow, setCitiesToShow] = useState([]);
    const states = useSelector(state=>state.states)
    const [statesToShow, setStatesToShow] = useState([])
    const [showCityInput, setShowCityInput] = useState(true)

    useEffect(()=>{
        dispatch(getStates());
        dispatch(getStates());
        dispatch(getCities(local.state))
    },[])
    
    const disabled = errors.name || errors.phone || errors.capacity || errors.image || errors.bookPrice || errors.location || !scheduleArray.days.length || errors.city || !containsName(cities, local.city) || !containsName(states, local.state)
    
    const handleState = (event) => {
        setShowCityInput(false)
        setCitiesToShow([])
        setLocal({
            ...local,
            state: event.target.value,
            city: ""
        })
        if (event.target.value){
            let filteredStates = states.filter(state=>state.name.toLowerCase().includes(event.target.value.toLowerCase()))
            setStatesToShow(filteredStates)
        }else{
            setStatesToShow([])
        }
        if (containsName(states,event.target.value)){
            setStatesToShow([])
            setShowCityInput(true)
            dispatch(getCities(event.target.value))
        }
    }

    const handleChooseState = (event) => {
        event.preventDefault();
        setShowCityInput(true)
        setLocal({
            ...local,
            state:event.target.name
        })
        setStatesToShow([])
        dispatch(getCities(event.target.name))
    }

    const handleCity = (event) => {
        setLocal({
            ...local,
            city:event.target.value
        })
        if (event.target.value){
            let filteredCities = cities.filter(city=>city.name.toLowerCase().includes(event.target.value.toLowerCase()))
            setCitiesToShow(filteredCities)
        }else{
            setCitiesToShow([])
        }
        if (containsName(cities,event.target.value)){
            setCitiesToShow([])
        }
    }

    const handleChooseCity = (event) => {
        event.preventDefault();
        setLocal({
            ...local,
            city:event.target.name
        })
        setCitiesToShow([])
    }


    const handleChange = (e) => {
        setErrors(validate({
            ...local,
            [e.target.name]: e.target.value
        }))
        setLocal({
            ...local,
            [e.target.name]: e.target.value
        })
    }

    const handleHour = (e) => {
        setScheduleArray({
            ...scheduleArray,
            [e.target.name]: e.target.value
        })
    }

    const handleWeekdays = (e) => {
        setCheckboxState({
            ...checkboxState,
            [e.target.name]: !checkboxState[e.target.name]
        })
        if (e.target.checked) {
            setScheduleArray({
                ...scheduleArray,
                days: [...scheduleArray.days, e.target.name]
            })
        } else {
            let filterDays = scheduleArray.days.filter(day => day !== e.target.name)
            setScheduleArray({
                ...scheduleArray,
                days: filterDays
            })
        }
    }

    const handleAge = (e) => {
        setLocal({
            ...local,
            [e.target.name]:e.target.value
        })
    }

    const handleCategory = (e) => {
        setLocal({
            ...local,
            [e.target.name]: e.target.value
        })
    }

    const handleCheckbox = (e) => {
        setCheckboxState({
            ...checkboxState,
            [e.target.name]: !checkboxState[e.target.name]
        })
        setLocal({
            ...local,
            [e.target.name]: !local[e.target.name]
        })
    }

    const handleCancel = (e) => {
        e.preventDefault();
        props.setEditing(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (window.confirm("Desea guardar estos cambios?")) {
        //         const updatedLocal =await dispatch(updatePlace({
        //             ...local,
        //             schedule:[...scheduleArray.days,scheduleArray.open,scheduleArray.close]
        //         }))
        //         if (updatedLocal.id){
        //             alert("Local actualizado!")
        //             props.setEditing(false);
        //         }else{
        //             alert(updatedLocal.response.data)
        //         }
        //         dispatch(getUserByid(userId))
        // }

        swal({
            title: "Deseas guardar los cambios?",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    swal("Local actualizado!", {
                        icon: "success",
                    });
                    const updatedLocal = await dispatch(updatePlace({
                        ...local,
                        schedule: [...scheduleArray.days, scheduleArray.open, scheduleArray.close]
                    }))
                    if (updatedLocal.id) {
                        props.setEditing(false);
                    } else {
                        alert(updatedLocal.response.data)
                    }
                    dispatch(getUserByid(userId))
                }
            });
    }

    return (
        // <div>
        <div className={styles.container}>
            <div className={checked ? styles.formContainer : styles.formContainerDark}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.alinearIzq}>
                        <label style={errors.name ? { color: "red" } : null} className={styles.label}>Nombre del local: </label>
                        <input
                            type='text'
                            placeholder='Nombre del local'
                            value={local.name}
                            name="name"
                            onChange={handleChange}
                            className={checked ? styles.input : styles.inputDark}
                        />
                    </div>

                    <div className={styles.alinearIzq}>
                        <label style={errors.image ? { color: "red" } : null} className={styles.label}>URL de la imagen: </label>
                        <input
                            type='url'
                            placeholder='Imagen/logo'
                            value={local.image}
                            name="image"
                            onChange={handleChange}
                            className={checked ? styles.input : styles.inputDark}
                        />
                    </div>

                    <div className={styles.alinearIzq}>
                        <label style={errors.location ? { color: "red" } : null} className={styles.label}>Dirección</label>
                        <input
                            type='text'
                            placeholder='Direccion'
                            value={local.location}
                            name="location"
                            onChange={handleChange}
                            className={checked ? styles.input : styles.inputDark}
                        />
                    </div>

                    <div className={styles.alinearIzq}>
                        <label style={!containsName(states,local.state) ? { color: "red" } : null} className={styles.label}>Estado: </label>
                        <input
                            type='text'
                            placeholder='Estado'
                            value={local.state}
                            name="state"
                            onChange={handleState}
                            className={checked ? styles.input : styles.inputDark}
                        />
                        { !!statesToShow.length && 
                        <div className={styles.buttonContainer}>
                            {statesToShow.map(state=>(
                                <button className={checked ? styles.suggestionButton : styles.suggestionButtonDark} key={state.id} name={state.name} onClick={handleChooseState}>{state.name}</button>
                            ))}
                        </div>
                        }
                    </div>  

                    {showCityInput && 
                    <div className={styles.alinearIzq}>
                    <label style={!containsName(cities,local.city) ? { color: "red" } : null} className={styles.label}>Ciudad: </label>
                        <input
                            type='text'
                            placeholder='Ciudad'
                            value={local.city}
                            name="city"
                            onChange={handleCity}
                            className={checked ? styles.input : styles.inputDark}
                        />
                        {!!citiesToShow.length && 
                        <div className={styles.buttonContainer}>
                            {citiesToShow.map(city=>(
                                <button className={checked ? styles.suggestionButton : styles.suggestionButtonDark} key={city.id} name={city.name} onClick={handleChooseCity}>{city.name}</button>
                            ))}
                        </div>}
                    </div>}

                    <div className={styles.alinearIzq}>
                        <label className={styles.label}>Menú</label>
                        <input
                            type='text'
                            placeholder='Menú'
                            value={local.menu}
                            name="menu"
                            onChange={handleChange}
                            className={checked ? styles.input : styles.inputDark}
                        />
                    </div>

                    <div className={styles.alinearIzq}>
                        <label style={errors.phone ? { color: "red" } : null} className={styles.label}>Número de teléfono</label>
                        <input
                            type='text'
                            placeholder='Numero de telefono'
                            value={local.phone}
                            name="phone"
                            onChange={handleChange}
                            className={checked ? styles.input : styles.inputDark}
                        />
                    </div>

                    <div className={styles.alinearIzq}>
                        <label style={errors.capacity ? { color: "red" } : null} className={styles.label}>Capacidad</label>
                        <input
                            type='number'
                            placeholder='Capacidad'
                            value={local.capacity}
                            name="capacity"
                            onChange={handleChange}
                            className={checked ? styles.input : styles.inputDark}
                        />
                    </div>

                    <div className={styles.scheduleContainer} >
                        <h4 style={!scheduleArray.days.length ? { color: "red" } : null}>Horarios</h4>
                        <div className={styles.weekHours}>
                            <div className={checked ? styles.weekdaysContainer : styles.weekdaysContainerDark}>
                                {weekDays.map(day => (
                                    <label key={day} className={styles.label}>
                                        <input
                                            checked={checkboxState[day]}
                                            type="checkbox"
                                            name={day}
                                            value={day}
                                            onChange={handleWeekdays}
                                        />
                                        {day}
                                    </label>
                                ))}
                            </div>

                            <div className={checked ? styles.hoursContainer : styles.hoursContainerDark}>
                                <div>
                                    <label className={styles.label}>Desde:</label>
                                    <select name="open" id="apertura" onChange={handleHour} className={checked ? styles.selectHours : styles.selectHoursDark}>
                                        <option hidden>Horario de apertura</option>
                                        {horaApertura.map((hora) => {
                                            return (
                                                <option key={hora}>{hora}</option>
                                            )
                                        })}
                                    </select>
                                </div>

                                <div>
                                    <label className={styles.label}>Hasta:</label>
                                    <select name="close" id="cierre" onChange={handleHour} className={checked ? styles.selectHours : styles.selectHoursDark}>
                                        <option hidden> Horario de cierre</option>
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
                    <select id="ageRange" name="ageRange" onChange={handleAge} className={checked ? styles.select : styles.selectDark}>
                        <option hidden>Selecciona las edades</option>
                        <option value="+18">+18</option>
                        <option value="+21">+21</option>
                        <option value="Sin restricciones">Sin restricciones</option>
                    </select>

                    <div >
                        <h4>Categoria</h4>
                        <select id="category" name="category" onChange={handleCategory} className={checked ? styles.select : styles.selectDark}>
                            <option value="" hidden>Selecciona el tipo de local que mas coincida con el tuyo</option>
                            <option value="disco">Discoteca</option>
                            <option value="bar">Bar</option>
                            <option value="pub">Pub</option>
                        </select>
                    </div>

                    <div className={styles.alinearIzq}>
                        <label style={errors.bookPrice ? { color: "red" } : null} className={styles.label}>Precio de la reserva</label>
                        <input
                            type='number'
                            placeholder='Precio de la reserva'
                            value={local.bookPrice}
                            name="bookPrice"
                            onChange={handleChange}
                            className={checked ? styles.input : styles.inputDark}
                        />
                    </div>

                    <div >
                        <label style={errors.bookPrice ? { color: "red" } : null}>Promo</label>
                        <input
                            type='text'
                            placeholder='Promo'
                            value={local.promo}
                            name="promo"
                            onChange={handleChange}
                            className={checked ? styles.input : styles.inputDark}
                        />
                    </div>

                    <div className={styles.petFriendlyEventos}>
                        <div >
                            <label>
                                En tu local se realizan eventos(ej: shows en vivo)
                                <input
                                    checked={checkboxState.event}
                                    type='checkbox'
                                    value={local.event}
                                    name="event"
                                    onChange={handleCheckbox}
                                />
                            </label>
                        </div>

                        <div >
                            <label>Tu local es pet friendly?
                                <input
                                    checked={checkboxState.petFriendly}
                                    type='checkbox'
                                    value={local.petFriendly}
                                    name="petFriendly"
                                    onChange={handleCheckbox}
                                />
                            </label>
                        </div>

                        <div >
                            <label>Local disponible
                                <input
                                    checked={checkboxState.available}
                                    type='checkbox'
                                    value={local.available}
                                    name="available"
                                    onChange={handleCheckbox}
                                />
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        id="localButton"
                        className={styles.registrarButton}
                        disabled={disabled}
                    >
                        Guardar
                    </button>
                    <button onClick={handleCancel} className={styles.cancelar}>Cancelar</button>
                </form>
            </div>

        </div>

        // </div>
    )
}
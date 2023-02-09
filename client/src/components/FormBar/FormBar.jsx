import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CloudinaryContext, Image } from 'cloudinary-react';
import { ImageUpload } from 'cloudinary-react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { createPlace, getCities, getStates } from '../../redux/actions';
import styles from '../FormBar/FormBar.module.css';
import { validation } from './ValidationFormBar';
import swal from "sweetalert"
import { useEffect } from 'react';

export function containsName(array, string) {
    return array.some(function(obj) {
      return obj.name === string;
    });
  }

export default function CreateLocal() {
    const dispatch = useDispatch();
    const history = useHistory();
    const profile = useSelector(state => state.profile)
    const checked = useSelector((state) => state.darkmode);
    const weekDays = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"]
    const horaApertura = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00']
    const horaCierre = ['00:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00']
    const [scheduleArray, setScheduleArray] = useState({
        days: [],
        open: "",
        close: ""
    })
    useEffect(async()=>{
        await dispatch(getStates())
        await dispatch(getStates()) //no borrar o_o
    },[])

    const cities = useSelector(state=>state.cities)
    const [citiesToShow, setCitiesToShow] = useState([]);
    const states = useSelector(state=>state.states)
    const [statesToShow, setStatesToShow] = useState([])
    const [showCityInput, setShowCityInput] = useState(false)

    const [local, setLocal] = useState({
        userId: profile.id,
        name: "",
        image: [],
        location: "",
        menu: [],
        phone: "",
        capacity: "",
        city: "",
        state:"",
        schedule: [],
        ageRange: "",
        category: '',
        event: false,
        petFriendly: false,
        bookPrice: "",
        available: true,
        status: "solicitud"
    })

    const [errors, setErrors] = useState({
        image: "",
    })

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
            ageRange: event.target.value
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
        if (event.target.checked) {
            setScheduleArray({
                ...scheduleArray,
                days: [...scheduleArray.days, event.target.name]
            })
        }
        else {
            let filterDays = scheduleArray.days.filter(day => day !== event.target.name)
            setScheduleArray({
                ...scheduleArray,
                days: filterDays
            })
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // const newLocal = await dispatch((createPlace({
        //     ...local,
        //     schedule: [...scheduleArray.days, scheduleArray.open, scheduleArray.close]
        // })));
        // if (newLocal.id) {
        //     history.push(`/detail/${newLocal.id}`)
        // } else {
        //     alert(newLocal.response.data)
        // }

        swal({
            title: "Crear local?",
            text: "Se enviara una solicitud de aprobacion de tu local",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willSend) => {
                if (willSend) {
                    const newLocal = await dispatch((createPlace({
                        ...local,
                        schedule: [...scheduleArray.days, scheduleArray.open, scheduleArray.close]
                    })));
                    swal("Solicitud enviada! Te mandaremos un mail cuando tu local sea aprobado!", {
                        icon: "success",
                    });
                    if (newLocal.id) {
                        history.push(`/detail/${newLocal.id}`)
                    } else {
                        swal(newLocal.response.data, {
                            icon: "error",
                        });
                    } 
                }
            });
    }

    //********************************** CLOUDINARY */
    const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/thomrojas/upload";
    const CLOUDINARY_UPLOAD_PRESET = "reactapp";

    // const [imageUrl, setImageUrl] = useState('');

    const handleImageUpload = async (event) => {
        const files = event.target.files;
        for (let file of  files) {    
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        await  axios.post(CLOUDINARY_URL, formData)
        .then(res => {
            setLocal(prevState => ({
                ...prevState, image: [...prevState.image, res.data.secure_url]
              }));   
        })
        .catch(err => console.error(err));
        }
    }

    const handleMenuUpload = async (event) => {
        const files = event.target.files;
        for (let file of  files) {    
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        await  axios.post(CLOUDINARY_URL, formData)
        .then(res => {
            setLocal(prevState => ({
                ...prevState, menu: [...prevState.menu, res.data.secure_url]
              }));   
        })
        .catch(err => console.error(err));
        }    
    }

    const handleDelete = (event) => {
        const newInputImageArr = local.image.filter(element => element !== event.target.name)
        setLocal({...local, image: newInputImageArr})

    }



    //********************************** CLOUDINARY */


    return (
        <div className={checked ? styles.formBarContainer : styles.formBarContainerDark}>
            <Navbar />
            <div className={styles.container}>
                <div className={checked ? styles.formContainer : styles.formContainerDark}>
                    <h1 className={checked ? styles.title : styles.titleDark}>Registra tu local</h1>
                    <form onSubmit={handleSubmit}>
                        <h3 className={checked ? styles.subtitles : styles.subtitlesDark}>Perfil</h3>
                        <hr />
                        <div className={styles.doubleFields}>
                            <div >
                                <input
                                    type='text'
                                    placeholder='Nombre del local'
                                    value={local.name}
                                    name="name"
                                    onChange={handleChange}
                                    className={checked ? styles.input : styles.inputDark}
                                />
                            </div>

                            <div className={styles.divCategory}>
                                <input
                                    type='text'
                                    placeholder='Direccion'
                                    value={local.location}
                                    name="location"
                                    onChange={handleChange}
                                    className={checked ? styles.input : styles.inputDark}
                                />
                            </div>
                        </div>

                        <div >
                            {/* <input
                                type='url'
                                placeholder='Imagen/logo'
                                value={local.image}
                                name="image"
                                onChange={handleChange}
                                className={checked ? styles.input : styles.inputDark}
                            /> */}
                            <div  className={checked ? styles.input : styles.inputDark}>
                                <div className={styles.divInputUpdate}>
                                <p className={styles.inputText}>Local Imagenes</p>   
                                <input 
                                className={styles.inputUpdate}
                                type="file"
                                multiple
                                onChange={handleImageUpload}   
                                />
                                </div>  
                                <div>
                                    {local.image?.map(element =>{
                                        return(
                                            <img 
                                            name={element}
                                            src={element} 
                                            alt="" 
                                            className={styles.inputImg} 
                                            onClick={handleDelete} />
                                        )
                                    } )
                                    }
                                

                                </div>
                            </div>
                            {errors.image && <p className={styles.errors}>{errors.image}</p>}
                        </div>

                        <div >
                            <input
                                type='text'
                                placeholder='Provincia'
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
                        <div >
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

                        <div >
                            <input
                                type='text'
                                placeholder='Numero de telefono'
                                value={local.phone}
                                name="phone"
                                onChange={handleChange}
                                className={checked ? styles.input : styles.inputDark}
                            />
                        </div>

                        <h3 className={checked ? styles.subtitles : styles.subtitlesDark}>Horario de atención</h3>
                        <hr />

                        <div className={styles.weekHours}>
                            <div className={checked ? styles.weekdaysContainer : styles.weekdaysContainerDark}>
                                {weekDays.map(day => (
                                    <label key={day} className={checked ? styles.label : styles.labelDark}>
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
                            <div className={checked ? styles.hoursContainer : styles.hoursContainerDark}>
                                <div>
                                    <label className={checked ? styles.label : styles.labelDark}>Desde:</label>
                                    <select name='open' onChange={handleHour} className={checked ? styles.selectHours : styles.selectHoursDark}>
                                        <option>Horario de apertura</option>
                                        {horaApertura.map((hora) => {
                                            return (
                                                <option key={hora}>{hora}</option>
                                            )
                                        })}
                                    </select>
                                </div>

                                <div>
                                    <label className={checked ? styles.label : styles.labelDark}>Hasta:</label>
                                    <select name='close' onChange={handleHour} className={checked ? styles.selectHours : styles.selectHoursDark}>
                                        <option> Horario de cierre</option>
                                        {horaCierre.map((hora) => {
                                            return (
                                                <option key={hora}>{hora}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            {/* 
                            <div>
                                <label className={checked ? styles.label : styles.labelDark}>Hasta:</label>
                                <select onChange={handleHour} className={styles.selectHours}>
                                    <option> Horario de cierre</option>
                                    {horaCierre.map((hora) => {
                                        return (
                                            <option key={hora}>{hora}</option>
                                        )
                                    })}
                                </select>
                            </div> */}
                        </div>

                        {/* </div> */}

                        <h3 className={checked ? styles.subtitles : styles.subtitlesDark}>Negocio</h3>
                        <hr />

                        <div className={styles.doubleFields}>
                            <select name="ageRange" onChange={handleAge} className={checked ? styles.select : styles.selectDark}>
                                <option value="" hidden>Rango de edad</option>
                                <option value="+18">+18</option>
                                <option value="+21">+21</option>
                                <option value="Sin restricciones">Sin restricciones</option>
                            </select>

                            <div >
                                <select name="category" onChange={handleCategories} className={checked ? styles.select : styles.selectDark}>
                                    <option value="" hidden>Categoria</option>
                                    <option value="disco">Discoteca</option>
                                    <option value="bar">Bar</option>
                                    <option value="pub">Pub</option>
                                </select>
                            </div>
                        </div>

                        {/* <div >
                            <input
                                type='text'
                                placeholder='Menu'
                                value={local.menu}
                                name="menu"
                                onChange={handleMenuUpload}
                                className={checked ? styles.input : styles.inputDark}
                            />
                        </div> */}
                        <div className={checked ? styles.input : styles.inputDark}>
                            <span className={styles.falsoPlaceholder}>Menu</span>
                            <input 
                                // value='3'
                                name='menu'
                                type="file"
                                multiple
                                onChange={handleMenuUpload}   
                                className={styles.divInputUpdate}
                                />
                                
                        </div>

                        <div className={styles.doubleFields}>
                            <div >
                                <input
                                    type='number'
                                    placeholder='Capacidad'
                                    value={local.capacity}
                                    name="capacity"
                                    onChange={handleChange}
                                    className={checked ? styles.input : styles.inputDark}
                                />
                            </div>

                            <div >
                                <input
                                    type='number'
                                    placeholder='Precio de la reserva'
                                    value={local.bookPrice}
                                    name="bookPrice"
                                    onChange={handleChange}
                                    className={checked ? styles.input : styles.inputDark}
                                />
                            </div>
                        </div>

                        <div className={styles.petFriendlyEventos}>
                            <div >
                                <label className={checked ? styles.label : styles.labelDark}>
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
                                <label className={checked ? styles.label : styles.labelDark}>Tu local es pet friendly?
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
                            className={checked ? styles.registrarButton : styles.registrarButtonDark}
                            disabled={!local.bookPrice || !local.ageRange || !local.capacity || !local.category  || !local.location  || !local.name || !local.phone || !local.schedule || !containsName(cities,local.city)}
                        >Registrar local</button>
                    </form>
                </div>
            </div >
        </div >
    )
}
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import { createPlace } from '../../redux/actions';

export default function CreateLocal() {
    const dispatch = useDispatch();
    const history = useHistory();
    const profile = useSelector(state => state.profile)
    const horaApertura = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00']
    const horaCierre = ['00:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00' ]

    const [local, setLocal] = useState({
        userId: profile.userId,
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
    })

    const handleChange = (event) => {
        setLocal({
            ...local,
            [event.target.name]: event.target.value
        })
    }

    const handleSchedule  = (event) => {
        if(!local.schedule.includes(event.target.value)) {
            setLocal({
                ...local,
                schedule: [...local.schedule, event.target.value]
            })
        }
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
    if(!local.petFriendly) {
        setLocal({
            ...local,
            petFriendly: true
        })
    }
   }

   const handleEvent = (event) => {
    if(!local.event) {
        setLocal({
            ...local,
            event: true
        })
    }
   }

   const handleWeekdays = (event) => {
    setLocal({
        ...local,
        schedule: [...local.schedule, event.target.value]
    })
   }

    const handleSubmit = (event) => {
    event.preventDefault();
    dispatch((createPlace(local)))
    // setLocal({
    //     id: "",
    //     name: "",
    //     image: "",
    //     location: "",
    //     menu: "",
    //     phone: "",
    //     capacity: "",
    //     schedule: [],
    //     ageRange: [],
    //     category: "", 
    //     event: false, 
    //     petFriendly: false, 
    //     bookPrice: "",
    // })
    //despachar action que postee el local
    //si lo creo, alerta q te avise y q te redirija al detail del local y limpiar el form
    //si no lo creo, mostrar errores
    }


    return(
        <div>
            <Navbar/>
            <div>
                <h1>Registra tu local!</h1>
                <form onSubmit={handleSubmit}>
                <div >
                <input 
                    type='text' 
                    placeholder='Nombre del local'
                    value={local.name}
                    name="name"
                    onChange={handleChange}
                /> 
                </div>
                
                <div >
                <input
                    type='text' 
                    placeholder='Imagen/logo'
                    value={local.image}
                    name="image"
                    onChange={handleChange}
                />
                </div>

                <div >
                <input
                    type='text' 
                    placeholder='Direccion'
                    value={local.location}
                    name="location"
                    onChange={handleChange}
                />
                </div>

                <div >
                <input
                    type='text' 
                    placeholder='Menu'
                    value={local.menu}
                    name="menu"
                    onChange={handleChange}
                />
                </div>

                <div >
                <input
                    type='text' 
                    placeholder='Numero de telefono'
                    value={local.phone}
                    name="phone"
                    onChange={handleChange}
                />
                </div>
                
                <div >
                <input
                    type='number' 
                    placeholder='Capacidad'
                    value={local.capacity}
                    name="capacity"
                    onChange={handleChange}
                />
                </div>

                <div >
                <h4>Horarios</h4>
                <div>
                    <input 
                        type="checkbox"
                        name="lunes"
                        value="lunes"
                        onChange={handleWeekdays}
                    ></input>
                    <label>Lunes</label>
                
                    <input 
                    type="checkbox"
                    name="martes"
                    value="martes"
                    onChange={handleWeekdays}
                    ></input>
                    <label>Martes</label>
                
                    <input 
                    type="checkbox"
                    name="miercoles"
                    value="miercoles"
                    onChange={handleWeekdays}
                    ></input>
                    <label>Miercoles</label>
                
                    <input 
                    type="checkbox"
                    name="jueves"
                    value="jueves"
                    onChange={handleWeekdays}
                    ></input>
                    <label>Jueves</label>
                
                    <input 
                    type="checkbox"
                    name="viernes"
                    value="viernes"
                    onChange={handleWeekdays}
                    ></input>
                    <label>Viernes</label>
                 
                    <input 
                        type="checkbox"
                        name="sabado"
                        value="sabado"
                        onChange={handleWeekdays}
                    ></input>
                    <label>Sabado</label>
              
                    <input 
                        type="checkbox"
                        name="domingo"
                        value="domingo"
                        onChange={handleWeekdays}
                    ></input>
                    <label>Domingo</label>

                </div>
               
                {/* <input
                    type='text' 
                    placeholder='Dia de apertura'
                    
                    name="schedule"
                    onChange={handleSchedule}
                />
                <label>A:</label>
                <input
                    type='text' 
                    placeholder='Dia de cierre'
                    
                    name="schedule"
                    onChange={handleSchedule}
                /> */}
                </div>

                {/* <div >
                <label>Desde:</label>
                <input
                    type='number' 
                    min='1'
                    max='24'
                    placeholder='Hora de apertura'
                    name="schedule"
                    onChange={handleSchedule}
                />
                <label>Hasta:</label>
                <input
                    type='number' 
                    min='1'
                    max='24'
                    placeholder='Hora de cierre'
                    
                    name="schedule"
                    onChange={handleSchedule}
                />
                </div> */}

                <label>Desde:</label>
                <select onChange={handleSchedule}>
                    <option>Seleccione horario de apertura</option>
                    {horaApertura.map((hora) => {
                        return(
                            <option key={hora}>{hora}</option>
                        )
                    })}
                </select>

                <label>Hasta:</label>
                <select onChange={handleSchedule}>
                    <option>Seleccione horario de cierre</option>
                    {horaCierre.map((hora) => {
                        return(
                            <option key={hora}>{hora}</option>
                        )
                    })}
                </select>
                <div >
                <h4>¿Tu local tiene restricciones por edad?</h4>
                <select name="ageRange" onChange={handleAge}>
                    <option value="" hidden>Selecciona las edades</option>
                    <option value="+18">+18</option>
                    <option value="+21">+21</option>
                    <option value="Sin restricciones">Sin restricciones</option>
                </select>
                </div>

                <div >
                <h4>Categoria</h4>
                <select name="category" onChange={handleCategories}>
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
                />
                </div>

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
                <label>Tu local es pet friendly?</label>
                <input
                    type='checkbox' 
                    value={local.petFriendly}
                    name="petFriendly"
                    onChange={handlePetFriendly}
                />
                </div>
                
                {console.log(local)}
                <button 
                    type="submit" 
                    id="localButton" 
                    // disabled={!local.bookPrice || !local.ageRange || !local.capacity || !local.category || !local.event || !local.id || !local.image || !local.location || !local.menu || !local.name || !local.petFriendly || !local.phone || !local.schedule }
                >Registrar local</button>
                </form>
            </div>

        </div>
    )
}
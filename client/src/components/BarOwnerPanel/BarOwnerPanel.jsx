import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import LocalsInfo from "../MyLocalsInfo/LocalsInfo";
import Navbar from "../Navbar/Navbar";
import style from "./BarOwnerPanel.module.css"
import { getPlaceDetail, cleanDetail } from "../../redux/actions";

export default function BarOwnerPanel() {
    const { profile, darkmode, placeDetail } = useSelector(state => state)
    const history = useHistory();
    const date = new Date();
    const dispatch = useDispatch();
    const [id, setId] = useState("")
    const handleCreate = () => {
        history.push("/newplace")
    }
    const books = placeDetail.books
    const [fecha, setFecha] = useState("")

    const handleChange = async (event) => {
        dispatch(getPlaceDetail(id));
        setFecha(event.target.value)
        console.log(books)
    }

    return (
        <>
            <Navbar />
            {/* <button onClick={handleVolver}>Volver al perfil</button> */}
            <div className={style.mainContainer}>
                <div className={darkmode ? style.localsContainer : style.localsContainerDark}>
                    <h1>Locales</h1>
                    {profile.locals?.length
                        ?
                        <LocalsInfo profileId={profile.id} locals={profile.locals} set={setId} />
                        :
                        <div>
                            <h3>Actualmente no tienes ningún local</h3>
                            <button onClick={handleCreate} className={style.crearButton}>Crear local</button>
                        </div>}
                </div>

                {/* ------------------------------Igna--------------------------- */}
                <div className={darkmode ? style.localsContainer : style.localsContainerDark}>
                    <h2>Reservas</h2>
                    <input className={darkmode ? style.date : style.dateDark}
                        type='date'
                        // min={`${date.getFullYear()}-${getNum(date, "Month")}-${getNum(date, "Day")}`}
                        // max={`${date.getFullYear()}-${getNum(date, "Month")}-${getNum(date, "Day")}`} //mientras implementamos reservas posteriores
                        placeholder='Mail'
                        value={fecha}
                        name="reservedDate"
                        onChange={handleChange}
                    />

                    <div>
                        {
                            books?.map((reserva) => {
                                if (reserva.reservedDate === fecha) {
                                    return (<div>Nombre: {reserva.name} Personas: {reserva.personQuantity}  </div>)
                                } else { return <div>No hay reservas para esta fecha</div> }
                            })
                        }
                    </div>


                </div>
            </div>
        </>
    )
}
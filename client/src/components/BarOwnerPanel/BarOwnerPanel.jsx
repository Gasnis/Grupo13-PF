import { useState } from "react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import LocalsInfo from "../MyLocalsInfo/LocalsInfo";
import Navbar from "../Navbar/Navbar";
import { getUserByid } from "../../redux/actions";
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

    }

    const reservado = books?.filter((reserva) => reserva.reservedDate === fecha)
    .map((resfecha) => resfecha.personQuantity)
    .reduce((prev, curr) => prev + curr, 0);

    useEffect(() => {
        dispatch(getUserByid(profile.id));
    }, [dispatch, profile.id])

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
                    <div className={style.containerBook}>
                        {
                            books?.some((reserva) => reserva.reservedDate === fecha)
                                ?
                                books?.map((reserva) => {
                                    if (reserva.reservedDate === fecha) {
                                        return (<div className={style.book}>Nombre: {reserva.name} Personas: {reserva.personQuantity}  </div>)
                                    }
                                }
                                )
                                :
                                <h1>No tienes reservas todavia</h1>


                        }

                    </div>

                    <div className={style.datos}>
                        <h2>Capacidad: {placeDetail.capacity}</h2>
                        <h2>Resevas para esta fecha: {reservado}</h2>
                        <h2>Lugares disponibles: {placeDetail.capacity - reservado}</h2>

                    </div>

                    <div>
                        <Link to="/book">
                            <button className={style.reservar}>Reservar</button>
                        </Link>
                    </div>


                </div>
            </div>
        </>
    )
}
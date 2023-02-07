import { useState } from "react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import LocalsInfo from "../MyLocalsInfo/LocalsInfo";
import Navbar from "../Navbar/Navbar";
import { getUserByid } from "../../redux/actions";
import style from "./BarOwnerPanel.module.css"
import { getPlaceDetail, cleanDetail } from "../../redux/actions";

function getUniqueSortedDates(books) {
    const reservedDates = books.map(book => book.reservedDate);
    const uniqueDates = [...new Set(reservedDates)];
    return uniqueDates.sort((a, b) => a - b);
  }

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
    const [bookDates, setBookDates] = useState(getUniqueSortedDates(books))
    const [index, setIndex] = useState(0)
    const [fecha, setFecha] = useState(bookDates[index])

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

    const handleChangeDate = (e) => {
        e.preventDefault();
        switch(e.target.name){
            case "left":
                if (index===0){
                    setIndex(bookDates.length-1)
                }else{
                    setIndex(index-1)
                }
            setFecha(bookDates[index])
            break;
            case "right":
                if (index===bookDates.length-1){
                    setIndex(0)
                }else{
                    setIndex(index+1)
                }
            setFecha(bookDates[index])
            break;
        }
    }

    return (
        <div className={darkmode ? style.background : style.backgroundDark}>
            <Navbar />
            {/* <button onClick={handleVolver}>Volver al perfil</button> */}
            <div className={darkmode ? style.mainContainer : style.mainContainerDark}>
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
                    <div>
                        <button name="left" onClick={handleChangeDate}>{"<<"}</button>
                        <input className={darkmode ? style.date : style.dateDark}
                            type='date'
                            // min={`${date.getFullYear()}-${getNum(date, "Month")}-${getNum(date, "Day")}`}
                            // max={`${date.getFullYear()}-${getNum(date, "Month")}-${getNum(date, "Day")}`} //mientras implementamos reservas posteriores
                            placeholder='Mail'
                            value={fecha}
                            name="reservedDate"
                            onChange={handleChange}
                        />
                        <button name="right" onClick={handleChangeDate}>{">>"}</button>
                    </div>
                    <div className={style.containerBook}>
                        {
                            books?.some((reserva) => reserva.reservedDate === fecha)
                                ?
                                books?.map((reserva) => {
                                    if (reserva.reservedDate === fecha) {
                                        return (<div className={style.book}>
                                            <span>Nombre: {reserva.name}</span>
                                            <span>Personas: {reserva.personQuantity}</span>
                                            <span>Horario: {reserva.hourDate}</span>
                                        </div>)
                                    }
                                }
                                )
                                :
                                <h3>No tienes reservas para la fecha seleccionada</h3>
                        }
                    </div>

                    <div className={style.datos}>
                        <h3>Capacidad: {placeDetail.capacity}</h3>
                        <h3>Lugares reservados: {reservado}</h3>
                        <h3>Lugares disponibles: {placeDetail.capacity - reservado}</h3>
                    </div>

                    <div>
                        <Link to="/book">
                            <button className={style.reservar}>Reservar</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
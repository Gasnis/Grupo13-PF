import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { cleanDetail, getPlaceDetail } from "../../redux/actions";
import star from "../../utils/Star 4.png";
import location2 from "../../utils/location2.png";
import footprint from "../../utils/huella.png";
import rejected from "../../utils/rechazado.png";
import style from "./details.module.css";

export default function Detail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPlaceDetail(id));
        return dispatch(cleanDetail());
    }, []);

    const placeDetail = useSelector((state) => state.placeDetail);
    console.log(placeDetail);

    if (!placeDetail.id) {
        return (
            <div>
                <Navbar />
                <div className={style.loadingcontainer}>
                    <h1 className={style.loading}>Cargando...</h1>
                    <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="" />
                </div>
            </div>
        )
    }

    if (placeDetail.id == 400) {
        return (
            <div>
                <img
                    src="https://dinahosting.com/blog/cont/uploads/2021/03/error-404.jpg"
                    alt="" height="100%" width="100%"
                />

            </div>
        );
    }
    return (
        <>
            <Navbar />

            <div className={style.container}>
                <div className={style.img}>
                    <img src={placeDetail.image} alt="" />
                </div>

                <div className={style.head}>
                    <div className={style.textup}>
                        <p className={style.category}>
                            {placeDetail.category}
                        </p>
                        <p className={style.name}>{placeDetail.name}</p>
                    </div>
                    <div className={style.fondoamarillo}>
                        <p className={style.horariotitulo}>Horarios</p>
                        <p className={style.horario}>
                            {placeDetail.schedule
                                ?.slice(0, placeDetail.schedule.length - 2)
                                .map((day) => day[0].toUpperCase() + day.slice(1))
                                .join(" - ")}
                        </p>
                        <p className={style.horariohora}>
                            {placeDetail.schedule
                                ?.slice(placeDetail.schedule.length - 2)
                                .join(" a ")}
                        </p>
                        <a className={style.menu} href={placeDetail.menu}>
                            <h2>Menú</h2>
                        </a>
                        {placeDetail.promo ? (
                            <div className={style.promo}>
                                <p>Promo:</p>
                                <h2>{placeDetail.promo}</h2>
                            </div>
                        ) : (
                            <h2 className={style.promo}>Vuelve mas tarde para ver promociones</h2>
                        )}
                        <a className={style.direccion}
                            href={`https://www.google.com/maps/place/${placeDetail.location.replace(
                                / /g,
                                "+"
                            )}`}
                        >
                            <h3 className={style.titles}>{placeDetail.location}</h3>
                        </a>
                    </div>
                    <div className={style.sideDiv}>
                        <a
                            href={`https://www.google.com/maps/place/${placeDetail.location}`}
                        >
                            <img className={style.location2} src={location2} alt="" />
                        </a>
                        {placeDetail.ageRange ? (
                            <h1 className={style.edad}>{placeDetail.ageRange.join("-")}</h1>
                        ) : null}
                        <div>
                            <img className={style.footprint} src={footprint} alt="" />
                            {placeDetail.petFriendly ? null : <img src={rejected} alt="" />}
                        </div>
                    </div>
                    <div className={style.centrar}>
                        <Link to="/book">
                            <button className={style.reservar}>RESERVAR</button>
                        </Link>
                    </div>

                    <div>
                        <div className={style.rating}>{placeDetail.rating}<img className={style.star} src={star} alt="" /></div>
                        <div className={style.containerevent}>
                            {placeDetail.event ? (
                                <div className={style.event}>
                                    <h1>Show{placeDetail.event}</h1>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

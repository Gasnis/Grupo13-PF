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
import { sortDays } from "../ShowLocalInfo/ShowLocalInfo";
import Loading from "../Loading/Loading";

export default function Detail() {
    const { id } = useParams();
    const checked = useSelector((state) => state.darkmode);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPlaceDetail(id));
        return dispatch(cleanDetail());
    }, []);

    const placeDetail = useSelector((state) => state.placeDetail);
    
    if (!placeDetail.id) {
        return (
            <div>
                <Navbar />
                {/* <div className={style.loadingcontainer}>
                    <h1 className={style.loading}>Cargando...</h1>
                    <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="" />
                </div> */}
                <Loading />
            </div>
        )
    }
    console.log(placeDetail)

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
        <div className={ checked ? style.mainContainer : style.mainContainerDark}>
            <Navbar />

            <div className={style.container}>
                <div className={style.img}>
                    <img src={placeDetail.image[0]} alt="" />
                </div>

                <div className={ checked ? style.head : style.headDark}>
                    <div className={style.ratingShow}>
                        <div className={style.rating}>{placeDetail.rating}<img className={style.star} src={star} alt="" /></div>
                        <div className={style.containerevent}>
                            {placeDetail.event ? (
                                <div className={style.event}>
                                    <h3>Show{placeDetail.event}</h3>
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div className={style.textup}>
                        <span className={style.category}>
                            {placeDetail.category}
                        </span>
                        <span className={style.name}>{placeDetail.name}</span>
                    </div>
                    <div className={ checked ? style.fondoamarillo : style.fondoVioleta}>
                        <h3 className={style.horariotitulo}>Horarios</h3>
                        <span className={style.horario}>
                            {sortDays(placeDetail.schedule
                                ?.slice(0, placeDetail.schedule.length - 2))
                                .map((day) => day[0].toUpperCase() + day.slice(1))
                                .join(" - ")}
                        </span>
                        <span className={style.horariohora}>
                            {placeDetail.schedule
                                ?.slice(placeDetail.schedule.length - 2)
                                .join(" a ")}
                            <h3>Menú</h3>
                        </span>
                                { placeDetail.menu?.map(element => {
                                    return (
                                        <a className={style.menu} href={element} target="_blank">
                                         <img className={style.menuImg} src={element}  alt="" />
                                        </a>
                                         )
                                    })
                                }
                            
                        {placeDetail.promo ? (
                            <div className={style.promo}>
                                <span>Promo:</span>
                                <h4>{placeDetail.promo}</h4>
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
                            <span className={style.titles}>{placeDetail.location}</span>
                        </a>
                        <span className={style.ciudad}>{placeDetail.city}</span>
                    </div>
                    <div className={style.sideDiv}>
                        <a
                            href={`https://www.google.com/maps/place/${placeDetail.location}`}
                        >
                            <img className={style.location2} src={location2} alt="" />
                        </a>
                        <h1 className={style.edad}>{placeDetail.ageRange}</h1>
                        <div>
                            <img className={style.footprint} src={footprint} alt="" />
                            {placeDetail.petFriendly ? null : <img src={rejected} alt="" />}
                        </div>
                    </div>
                    <div className={style.centrar}>
                        <Link to="/book">
                            <button className={style.reservar}>Reservar</button>
                        </Link>
                    </div>

                </div>

            </div>
        </div>
    );
}

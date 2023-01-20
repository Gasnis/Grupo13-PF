import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { getPlaceDetail } from "../../redux/actions";
import star from "../../utils/Star 4.png";
import vector from "../../utils/Vector.png";
import location2 from "../../utils/location2.png";
import footprint from "../../utils/huella.png"
import rejected from "../../utils/rechazado.png";
import style from "./details.module.css";
import FormBook from "../FormBook/FormBook.jsx"


export default function Detail () {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [reserve, setReserve] = useState(false);
    useEffect(()=>{
        dispatch(getPlaceDetail(id));
    },[])

    const placeDetail = useSelector(state=>state.placeDetail)

    const handleClick = (e) => {
        setReserve(!reserve);
    }
    
    if (!placeDetail.id){
        return(
        <div>
            <h3>loading...</h3>
        </div>
        )
    }else{
        if (!reserve) {
            return (
                <div>
                    <Navbar/>
                    <div style={{backgroundImage:`url(${placeDetail.image})`}} className={style.head}>
                            <div>
                                <h1 className={style.titles}>{placeDetail.name}</h1>
                                <h2 className={style.titles}>{placeDetail.category}</h2>
                                <a href={placeDetail.location}><h3 className={style.titles}>Location</h3></a>
                            </div>
                            <div>
                                <h2>{placeDetail.rating}</h2>
                                <img className={style.star} src={star} alt="" />
                            </div>
                    </div>
                    <div className={style.cardsContainer}>
                        <div className={style.sideDiv}>
                            <h1>SHOW</h1>
                            {placeDetail.event 
                            ? 
                            (
                                <div>
                                    <h1>hay evento :=</h1>
                                </div>
                            )
                            :   
                                <div>
                                    <img src={vector} alt="" />
                                    <h2>No hay eventos</h2>
                                </div>
                            }
                        </div>
                        <div className={style.centerDiv}>
                            <h2>Horarios</h2>
                            <h3>{placeDetail.schedule?.slice(0,placeDetail.schedule.length-2).map(day=>day[0].toUpperCase()+day.slice(1)).join("-")}</h3>
                            <h3>{placeDetail.schedule?.slice(placeDetail.schedule.length-2).join("-")}</h3>
                            <a href={placeDetail.menu}><h2>Menú</h2></a>
                            {placeDetail.promo 
                            ?
                                <div>
                                    <h2>Promo:</h2>
                                    <h3>{placeDetail.promo}</h3>
                                </div>
                            :
                                <h3>Vuelve mas tarde para ver promociones</h3>
                            }
                            <button className={style.link} onClick={handleClick}>RESERVAR</button>
                        </div>
                        <div className={style.sideDiv}>
                            <a href={placeDetail.location}><img src={location2} alt="" /></a>
                            {placeDetail.ageRange 
                            ?
                            <h1>{placeDetail.ageRange.join("-")}</h1>
                            :
                            null}
                            <div>
                                <img src={footprint} alt="" />
                                {placeDetail.petFriendly 
                                ?
                                    null
                                :
                                    <img src={rejected} alt="" />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return (
                <div>
                    <FormBook localId={id}/>
                    <button className={style.goBack} onClick={handleClick}>VOLVER</button>
                </div> 
            )
        }

        }
    }
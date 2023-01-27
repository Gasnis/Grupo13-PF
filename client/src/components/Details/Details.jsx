import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { cleanDetail, getPlaceDetail } from "../../redux/actions";
import star from "../../utils/Star 4.png";
import vector from "../../utils/Vector.png";
import location2 from "../../utils/location2.png";
import footprint from "../../utils/huella.png"
import rejected from "../../utils/rechazado.png";
import style from "./details.module.css";


export default function Detail () {
    const {id} = useParams();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getPlaceDetail(id));
        return dispatch(cleanDetail());
    },[])

    const placeDetail = useSelector(state=>state.placeDetail)
    console.log(placeDetail)


    if (!placeDetail.id || placeDetail.id === 400){
        return(
        <div>
            <img src="https://dinahosting.com/blog/cont/uploads/2021/03/error-404.jpg" alt="" />
        </div>
        )
    }
    return (
        <div className={style.body}>
            <Navbar/>
            <div className={style.container}>
                <div className={style.img}>
                    <img src={placeDetail.image} alt="" />
                </div>
                <div className={style.head}>
                    <p>{placeDetail.category} {placeDetail.rating}<img className={style.star} src={star} alt="" /></p>
                    <p className={style.name}>{placeDetail.name}</p>
                    <p>Horarios</p>
                    <p>{placeDetail.schedule?.slice(0,placeDetail.schedule.length-2).map(day=>day[0].toUpperCase()+day.slice(1)).join("-")}</p>
                    <p>{placeDetail.schedule?.slice(placeDetail.schedule.length-2).join("-")}</p>
                    <a href={placeDetail.menu}><h2>Menú</h2></a>
                    {placeDetail.promo 
                    ?
                    <div>
                            <p>Promo:</p>
                            <h2>{placeDetail.promo}</h2>
                        </div>
                    :
                    <p>Vuelve mas tarde para ver promociones</p>
                    }
                    <a href={`https://www.google.com/maps/place/${placeDetail.location.replace(/ /g,"+")}`}><h3 className={style.titles}>Direccion: {placeDetail.location}</h3></a>
                    
                    <Link to="/book"><button className={style.reservar}>RESERVAR</button></Link>
                </div>
            </div>
            {/* <div className={style.cardsContainer}>
                <div className={style.sideDiv}>
                    <h1>SHOW</h1>
                    {placeDetail.event 
                    ? 
                    (
                        <div>
                            <h1>Hay evento</h1>
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
                    <h3>Horarios</h3>
                    <h3>{placeDetail.schedule?.slice(0,placeDetail.schedule.length-2).map(day=>day[0].toUpperCase()+day.slice(1)).join("-")}</h3>
                    <h3>{placeDetail.schedule?.slice(placeDetail.schedule.length-2).join("-")}</h3>
                    <a href={placeDetail.menu}><h2>Menú</h2></a>
                    {placeDetail.promo 
                    ?
                        <div>
                            <h3>Promo:</h3>
                            <h2>{placeDetail.promo}</h2>
                        </div>
                    :
                        <h3>Vuelve mas tarde para ver promociones</h3>
                    }
                    
                    <Link to="/book"><button className={style.link}>RESERVAR</button></Link>
                    
                </div>
                <div className={style.sideDiv}>
                    <a href={`https://www.google.com/maps/place/${placeDetail.location}`}><img src={location2} alt="" /></a>
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
            </div> */}
        </div>
    )

}
    
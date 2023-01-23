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
    const profile = useSelector(state=>state.profile)
    useEffect(()=>{
        dispatch(getPlaceDetail(id));
        return dispatch(cleanDetail());
    },[])

    const placeDetail = useSelector(state=>state.placeDetail)


    if (!placeDetail.id){
        return(
        <div>
            <img src="https://toppng.com/uploads/preview/404-error-error-404-transparent-11563210406bsmsusbbzi.pnghttps://img.freepik.com/premium-vector/404-error-page-found-minimalist-dark-concept-error-landing-page-web-page-missing_111925-131.jpg?w=2000" alt="" />
        </div>
        )
    }
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
                    {
                        profile? <Link to="/login"><button className={style.link}>RESERVAR</button></Link> :  <Link to="/book"><button className={style.link}>RESERVAR</button></Link>
                    }
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

}
    
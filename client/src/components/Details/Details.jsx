import React from "react";
import { useEffect } from "react";
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

export default function Detail (props) {
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getPlaceDetail(id));
    },[])

    // const placeDetail = useSelector(state=>state.placeDetail)
    let placeDetail = {
        image:"https://emprendeconhuevos.com/wp-content/uploads/2020/11/las-discotecas-ecologicas-negocios-de-moda_BQ6J7H.jpg",
        name: "Barto Boliche",
        category: "Discoteca",
        location: "calle x # 20-50",
        rating: 4,
        ageRange:"+18",
        petFriendly: false,
        
    }
    return (
        <div>
            <Navbar/>
            <div style={{backgroundImage:`url(${placeDetail.image})`}} className={style.head}>
                    <div>
                        <h1 className={style.titles}>{placeDetail.name}</h1>
                        <h2 className={style.titles}>{placeDetail.category}</h2>
                        <h3 className={style.titles}>{placeDetail.location}</h3>
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
                        null
                    :   
                        <div>
                            <img src={vector} alt="" />
                            <h2>No hay eventos</h2>
                        </div>
                    }
                </div>
                <div className={style.centerDiv}>
                    <h2>Horarios:</h2>
                    <h3>{placeDetail.schedule}</h3>
                    
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
                    <a href="/reservation">RESERVAR</a>
                </div>
                <div className={style.sideDiv}>
                    <img src={location2} alt="" />
                    <h1>{placeDetail.ageRange}</h1>
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
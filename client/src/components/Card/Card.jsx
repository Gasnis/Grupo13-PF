import React from "react";
import {Link} from "react-router-dom"
import style from "./card.module.css"


export default function Place({place}){
    return(
        <div className={style.places}>
            <Link className={style.place} to={`/detail/${place.id}`}>
                    <img src={place.image}  alt="img" />   
                    <br />
                    <div className={style.text}>
                        <div>
                            <h3>{place.name}</h3>
                            <h4>{place.category}</h4>
                        </div>
                        <div>
                            <h4>Edad {place.ageRange.map(age=> age).join("-")}</h4>
                        </div>
                    </div>
             </Link>
            
            </div>
            )
}
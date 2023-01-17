import React from "react";
import {Link} from "react-router-dom"


export default function Place({place}){
    return(
        <div className="Places">
            <Link className="Place" to={`/detail/${place.id}`}>
                <img src={place.image} className="img" alt="img" />   
                <h2>{place.name}</h2>
                <h2>{place.category}</h2>
                <h2>{place.location}</h2>
                <h2>{place.ageRange}</h2>
            </Link>
            
            </div>
            )
}
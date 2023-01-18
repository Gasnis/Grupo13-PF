import React from "react";
import {Link} from "react-router-dom"
import style from "./card.module.css"


export default function Place({place}){
    return(
        <div className={style.places}>
            {/* <Link className="Place" to={`/detail/${place.id}`}>
                <img src={place.image} className="img" alt="img" />   
                <h2>{place.name}</h2>
                <h2>{place.category}</h2>
                <h2>{place.location}</h2>
                <h2>{place.ageRange}</h2> */}
                <div className={style.place}>
                    <img src="https://img.freepik.com/vector-gratis/logo-negro-vintage-oktoberfest_225004-1232.jpg?w=2000" alt="img" />   
                    <br />
                    <div className={style.text}>
                        <div>
                            <h3>EL BAR PUB</h3>
                        </div>
                        <div>
                        <h4>PUB</h4>
                        <h4>Zuviria 125</h4>
                        <h4>+18</h4>

                        </div>
                    </div>
                </div>
            {/* </Link> */}
            
            </div>
            )
}
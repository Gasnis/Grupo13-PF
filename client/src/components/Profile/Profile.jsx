import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { getUserByid } from "../../redux/actions";
import style from "./profile.module.css";


export default function Detail () {
    const dispatch = useDispatch();
    const {id} = useParams()

    useEffect(()=>{
        dispatch(getUserByid(id));
    },[])

    const profile = useSelector(state=>state.profile)
    
//profile.locals
    if (!profile){
        return(
        <div>
            <h3>loading...</h3>
        </div>
        )
    }
    return (
        <div>
            <Navbar/>
            <hr/>
            <div> 

                <div className={style.divContainer} >
                    <img src={profile.image} alt="perfil photo" className={style.profilePict}/>
                    <h1 className={style.name}>{profile.name}</h1>
                </div>

                    <div className={style.divProfile}>
                        <span>Detalles del usuario:</span>
                        <p>Teléfono: {profile.phone}</p>
                        <p>Fecha de nacimiento: {profile.birthday}</p>
                        <p>Ciudad: {profile.city}</p>
                        
                    </div>

                    <div className={style.localsInformation}>
                    
                        <div>
                            {profile.locals?.length === 0 ? <div>No tienes locales asociados.</div>:<div><h1>Tus bares:</h1>{profile.locals?.map(l => l.name).join(" ")}</div>}
                            
                        </div>

                    </div>
            </div>
        </div>
    )
}
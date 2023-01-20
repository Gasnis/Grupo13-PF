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
                <div className={style.infoBarsAndInfoUser}>

                    <div className={style.divProfile}>
                        <span>Detalles del usuario: </span>
                        <p> <span>Teléfono: </span> {profile.phone}</p>
                        <p> <span>Fecha de nacimiento: </span> {profile.birthday}</p>
                        <p> <span>Ciudad:</span> {profile.city}</p>
                        
                    </div>

                    <div className={style.localsInformation}>
                    
                        <div>
                            {profile.locals?.length === 0 ? <div>Tus Books</div>:
                                <div>
                                    <h1>Tus bares:</h1>
                                    <div className={style.divYourBars}>
                                        {profile.locals?.map(l =>{
                                            return(
                                            <div className={style.infoBar}>
                                                <h1>{l.name}</h1>
                                                <img className={style.imgBar} src={l.image} alt="" />
                                            </div>)
                                        })}
                                    </div>
                                </div>
                            }                          
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
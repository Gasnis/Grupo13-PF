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
    },[dispatch, id])

    const profile = useSelector(state=>state.profile)

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
            <div> 
                <hr/>
                
                <div >
                    <img src={profile.image} alt="perfil photo" className={style.profilePict}/>
                </div>
                    <div>
                        <h1>{profile.name}</h1>
                        <p>{profile.phone}</p>
                        <p>{profile.birthday}</p>
                        <p>{profile.city}</p>
                        
                    </div>
            </div>
        </div>
    )
}
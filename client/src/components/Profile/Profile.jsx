import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { getUser } from "../../redux/actions";
import style from "./profile.module.css";


export default function Detail () {
    const dispatch = useDispatch();
    const {idUser} = useParams()

    useEffect(()=>{
        dispatch(getUser(idUser));
    },[])

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
                    <a href="https://i.postimg.cc/HsycywFq/Screenshot-2023-01-19-11-39-17-985-edit-com-miui-gallery.jpg"  >
                    <img src="https://i.postimg.cc/HsycywFq/Screenshot-2023-01-19-11-39-17-985-edit-com-miui-gallery.jpg" alt="perfil photo" className={style.profilePict}/>
                    </a>
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
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { getUser } from "../../redux/actions";
import style from "./profile.module.css";


export default function Detail () {
    const dispatch = useDispatch();
    // const {idUser} = useParams()

    useEffect(()=>{
        // dispatch(getUser(idUser));
    },[])

    const Profile = useSelector(state=>state.profile)

    if (!Profile){
        return(
        <div>
            <h3>loading...</h3>
        </div>
        )
    }
    return (
        <div>
            <Navbar/>
        </div>
    )
}
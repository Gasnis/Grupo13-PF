import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { getPlaceDetail } from "../../redux/actions"

export default function Detail (props) {
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getPlaceDetail(id));
    },[])

    const placeDetail = useSelector(state=>state.placeDetail)

    return (
        <div>
            <Navbar/>
            <div>

            </div>
        </div>
    )
}
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import "./home.module.css";
import Card from ".././Card/Card"
import {
    getPlaces
} from "../../redux/actions"

export default function Home () {

    const dispatch = useDispatch();
    
    let allPlaces = useSelector((state) => state.places)

    useEffect(()=>{
        // dispatch(getPlaces())
    },[dispatch])

    const currentPlaces = allPlaces.slice(0, 10)

   

    return (
        <div>
            <Navbar/>
            <div>
                {
                    currentPlaces.length?
                    currentPlaces === "404"? 
                        (
                            <h1>Not Found</h1>
                        ):
                        currentPlaces.map((place) =>{
                            return <Card key={place.id} place={place}>

                            </Card>
                        
                    })
                    :
                        <div>
                            <h1>loading...</h1>
                        </div>
                        
                }
            </div>
            <div>
                <button>+</button>
            </div>
            
        </div>
    )
}
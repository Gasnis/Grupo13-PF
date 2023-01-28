import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCategory, searchPlace, setInput, sortRating } from "../../redux/actions"
import Navbar from "../Navbar/Navbar";
import style from "./home.module.css";
import Card from ".././Card/Card"
import {
    getPlaces
} from "../../redux/actions"

export default function Home() {

    const dispatch = useDispatch();

    const {searchInput, darkmode} = useSelector(state => state)
    let allPlaces = useSelector((state) => state.places)

    useEffect(() => {
        dispatch(getPlaces())

    }, [dispatch])

    const [currentPlaces, setCurrentPlaces] = useState(9)

    function handlePlace(e) {
        e.preventDefault()
        setCurrentPlaces(currentPlaces + 9)
    }

    let renderPlaces = allPlaces.slice(0, currentPlaces)

    const handleSearchBar = (e) => {
        dispatch(setInput(e.target.value))
        dispatch(searchPlace(e.target.value))
    }

    return (
        <div>
            <Navbar />
            <div className={darkmode ? style.infodark : style.info}>
                <div>
                    <input className={style.searchbar} value={searchInput} onChange={handleSearchBar} type="search" placeholder="Busca tu bar" />
                </div>
                <div>
                    <div className={darkmode ? style.infodark : style.info}>
                        <div className={style.cardsContainer}>
                            {
                                renderPlaces.length ?
                                    renderPlaces === "404" ?
                                        (
                                            <h1>Not Found</h1>
                                        )
                                        :
                                        renderPlaces.map((place) => {
                                            return <Card key={place.id} place={place}>
                                            </Card>

                                        })
                                    :
                                    searchInput ?
                                        <div>
                                            <h1>No hay sitios con este nombre</h1>
                                        </div>
                                        :
                                        <div>
                                            <div className={darkmode ? style.cargandodark : style.cargando} >
                                                <h1>Cargando...</h1>
                                            </div>
                                        </div>
                            }
                        </div>
                    </div>

                    <div>
                        <button className={darkmode ? style.botonpaginadodark : style.botonpaginado} onClick={handlePlace}>+</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
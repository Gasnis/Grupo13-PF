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

    const searchInput = useSelector(state => state.searchInput)

    let allPlaces = useSelector((state) => state.places)
    const darkmode = useSelector((state) => state.darkmode)
    useEffect(() => {
        dispatch(getPlaces())

    }, [dispatch])

    const [currentPlaces, setCurrentPlaces] = useState(9)
    const [order, setOrder] = useState("");
    console.log(order)

    function handlePlace(e) {
        e.preventDefault()
        setCurrentPlaces(currentPlaces + 9)
    }

    let renderPlaces = allPlaces.slice(0, currentPlaces)

    const orderSelection = document.querySelector("#orderSelection");
    const category = document.querySelector("#category");


    const handlerCategory = (event) => {
        event.preventDefault()
        dispatch(filterCategory(event.target.value))
    }

    const handleFilteredOrder = (event) => {
        event.preventDefault()
        dispatch(sortRating(event.target.value))
        setOrder(event.target.value)
    }

    const refresh = (event) => {
        event.preventDefault();
        dispatch(getPlaces());
        category.selectedIndex = 0;
        orderSelection.selectedIndex = 0;
        dispatch(setInput(""))
    }

    const handleSearchBar = (e) => {
        dispatch(setInput(e.target.value))
        dispatch(searchPlace(e.target.value))
    }

    return (
        <div>

            <Navbar home={true} />
            <div className={style.filtercontainer}>
                <div>
                    <select id="orderSelection" className={style.filter} onChange={(event) => handleFilteredOrder(event)}>
                        <option value="all">Rating</option>
                        <option value="best">Mejores</option>
                        <option value="worst">Peores</option>
                    </select>
                </div>

                <div>
                    <select id="category" className={style.filter} onChange={(event) => handlerCategory(event)}>
                        <option value="all">Categoría</option>
                        <option value="pub">Pubs</option>
                        <option value="disco">Discotecas</option>
                        <option value="bar">Bares</option>
                    </select>
                </div>
                <div>
                    <button className={style.limpiar} onClick={refresh}>Limpiar</button>
                </div>

            </div>
            <div className={darkmode ? style.infodark : style.info}>
            <div>
                <input className={style.searchbar} value={searchInput} onChange={handleSearchBar} type="search" placeholder="Busca tu bar" />
            </div>
                <div>
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

                <div>
                    <button className={darkmode ? style.botonpaginadodark : style.botonpaginado} onClick={handlePlace}>+</button>
                </div>

            </div>

        </div>
    )
}
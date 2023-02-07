import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchPlace } from "../../redux/actions"
import Navbar from "../Navbar/Navbar";
import style from "./home.module.css";
import Card from ".././Card/Card"
import {
    getPlaces
} from "../../redux/actions";
import Loading from "../Loading/Loading";
import Promos from "../Carousel/Carousel";
import ScrollUpButtom from "../ScrollUpButton/ScrollUpButton.jsx";
import { IoSearch } from "react-icons/io5";


export default function Home() {

    const dispatch = useDispatch();

    const { searchInput, darkmode } = useSelector(state => state)
    let stateplaces = useSelector((state) => state.places)
    let allPlaces = stateplaces?.filter(place => place.status === "aprobado")

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
        dispatch(searchPlace(e.target.value))
    }

    return (
        <div className={style.principalDiv}>

            <Navbar home={true} />
            <Promos />
            <div className={darkmode ? style.info : style.infodark}>
                <div className={style.centrarSearch}>
                    <div className={darkmode ? style.searchBarContainer : style.searchBarContainerDark}>
                        <IoSearch className={darkmode ? style.icon : style.iconDark}/>
                        <input className={darkmode ? style.searchbar : style.searchbardark} onChange={handleSearchBar} type="search" placeholder="Busca tu bar..." />
                    </div>
                </div>
                <div>
                    <div className={darkmode ? style.info : style.infodark}>
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
                                                {/* <h1>Cargando... <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="" height="40x" width="40px"/></h1> */}
                                                <Loading />
                                            </div>
                                        </div>
                            }
                        </div>
                    </div>

                    <div>
                        <button className={darkmode ? style.botonpaginado : style.botonpaginadodark} onClick={handlePlace}>+</button>
                    </div>
                    <ScrollUpButtom />
                </div>
            </div>
        </div>
    )
}
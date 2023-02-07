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
                    <div className={style.searchBarContainer}>
                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xNS44NTMgMTYuNTZjLTEuNjgzIDEuNTE3LTMuOTExIDIuNDQtNi4zNTMgMi40NC01LjI0MyAwLTkuNS00LjI1Ny05LjUtOS41czQuMjU3LTkuNSA5LjUtOS41IDkuNSA0LjI1NyA5LjUgOS41YzAgMi40NDItLjkyMyA0LjY3LTIuNDQgNi4zNTNsNy40NCA3LjQ0LS43MDcuNzA3LTcuNDQtNy40NHptLTYuMzUzLTE1LjU2YzQuNjkxIDAgOC41IDMuODA5IDguNSA4LjVzLTMuODA5IDguNS04LjUgOC41LTguNS0zLjgwOS04LjUtOC41IDMuODA5LTguNSA4LjUtOC41eiIvPjwvc3ZnPg==" />
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
                </div>
            </div>
        </div>
    )
}
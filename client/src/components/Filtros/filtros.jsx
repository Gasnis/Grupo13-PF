import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { filterPlaces, getPlaceDetail } from "../../redux/actions"
import style from "./filtros.module.css"

export default function Detail(props) {
    // const { id } = useParams();
    const dispatch = useDispatch();
    const [stateDropdown, setDropdown] = useState(false);
    const [Boliche, setBoliche] = useState(false);
    const [Bar, setBar] = useState(false);
    const [Restaurante, setRestaurante] = useState(false);
    // useEffect(() => {
    //     dispatch(getPlaceDetail(id));
    // }, [])

    const allPlaces = useSelector(state => state.allPlaces)
    const showPlaces = useSelector(state => state.places)



    const handlerDropdownClicked = () => {
        setDropdown(!stateDropdown)
        document.getElementById("dropdown").classList.add("open")
    }

    const handlerCategory = (filter) => {
        if (filter === "Boliche") setBoliche(!Boliche);
        if (filter === "Bar") setBar(!Bar);
        if (filter === "Restaurante") setRestaurante(!Restaurante);
        const filtered = [];
        if (Boliche) {
            filtered.push(allPlaces.filter(ele => ele.category === "Boliche"))
        } else if (Bar) {
            filtered.push(allPlaces.filter(ele => ele.category === "Bar"))
        } else if (Restaurante) {
            filtered.push(allPlaces.filter(ele => ele.category === "Bar"))
        }
        dispatch(filterPlaces(filtered))
    }
    return (
        <>
            <div className={stateDropdown ? `${style.dropdown} ${style.open}` : `${style.dropdown}`} id="dropdown">
                <button onClick={() => handlerDropdownClicked()}>
                    Filtrar <img src=""></img>
                </button>
                <div id="menu" className={style.menu}>
                    <div id="menuinner" className={style.menuinner}>
                        <div className={style.containerCheck}>
                            <input type="checkbox" onClick={() => handlerCategory("Boliche")} id="Boliche" />
                            <label for="Boliche">Boliche</label>
                            <input type="checkbox" onClick={() => handlerCategory("Bar")} id="Bar" />
                            <label for="Bar">Bar</label>
                            <input type="checkbox" onClick={() => handlerCategory("Restaurante")} id="Restaurante" />
                            <label for="Restaurante">Restaurante</label>
                        </div>
                        {/* <div className={style.mainmenu}>
                            <button
                                onClick={handlerSubMenuClicked("mytools")}>
                                <span>build</span>Tools
                                <span>cevron_right</span>
                            </button>
                        </div>
                        <div id="mytools" className="submenu">
                            <button
                                onClick={handlerSubMenuClicked()}>
                                <span> arrow_back</span>Tools
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}


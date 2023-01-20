import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { filterPlaces, getPlaceDetail } from "../../redux/actions"
import style from "./filtros.module.css"
import arrow from "../../utils/arrow.svg"

export default function Detail(props) {
    // const { id } = useParams();
    const dispatch = useDispatch();
    const [stateDropdown, setDropdown] = useState(false);
    const [disco, setDisco] = useState(false);
    const [bar, setBar] = useState(false);
    const [pub, setPub] = useState(false);
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
        if (filter === "disco") setDisco(!disco);
        if (filter === "bar") setBar(!bar);
        if (filter === "pub") setPub(!pub);
        console.log(filter)
        const filtered = [];
        if (disco) {
            filtered.push(allPlaces.filter(ele => ele.category === "disco"))
        } else if (bar) {
            filtered.push(allPlaces.filter(ele => ele.category === "bar"))
        } else if (pub) {
            filtered.push(allPlaces.filter(ele => ele.category === "pub"))
        }
        
        dispatch(filterPlaces(filtered))
    }
    return (
        <>
            <div className={stateDropdown ? `${style.dropdown} ${style.open}` : `${style.dropdown}`} id="dropdown">
                <button onClick={() => handlerDropdownClicked()}>
                    Filtrar <img src={arrow}></img>
                </button>
                <div id="menu" className={style.menu}>
                    <div id="menuinner" className={style.menuinner}>
                        <div className={style.containerCheck}>
                            <input className={style.check} type="checkbox" onClick={() => handlerCategory("disco")} id="disco" />
                            <label htmlFor="disco">Discoteca</label>
                            <input className={style.check} type="checkbox" onClick={() => handlerCategory("bar")} id="bar" />
                            <label htmlFor="bar">Bar</label>
                            <input className={style.check} type="checkbox" onClick={() => handlerCategory("pub")} id="pub" />
                            <label htmlFor="pub">Pub</label>
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


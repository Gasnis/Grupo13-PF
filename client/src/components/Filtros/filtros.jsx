import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { filterCategory, filterPlaces, getPlaceDetail } from "../../redux/actions"
import style from "./filtros.module.css"

export default function Filter() {

    const dispatch = useDispatch();
    const [stateDropdown, setDropdown] = useState(false);
    const [disco, setDisco] = useState(true);
    const [bar, setBar] = useState(true);
    const [pub, setPub] = useState(true);
    
    

    const handlerDropdownClicked = () => {
        setDropdown(!stateDropdown)
        document.getElementById("dropdown").classList.add("open")
    }

    const handlerCategory = (event) => {
        if (event === "disco") setDisco(!disco);
        if (event === "bar") setBar(!bar);
        if (event === "pub") setPub(!pub);


        const filtered = [];
        if (disco) {
            filtered.push("disco")
        } else if (bar) {
            filtered.push("bar")
        } else if (pub) {
            filtered.push("pub")
        }

        
        dispatch(filterCategory(filtered))
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


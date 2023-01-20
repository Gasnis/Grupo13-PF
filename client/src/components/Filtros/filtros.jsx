import React from "react";
import { useDispatch } from "react-redux";
import { filterCategory } from "../../redux/actions"
import style from "./filtros.module.css"

export default function Filter() {

    const dispatch = useDispatch();

    const handlerCategory = (event) => {
        event.preventDefault()
        dispatch(filterCategory(event.target.value))
    }
    return (
                <div>
                    <select className={style.filter} onChange={handlerCategory}>
                        <option value="all">Todos</option>
                        <option value="pub">Pubs</option>
                        <option value="disco">Discotecas</option>
                        <option value="bar">Bares</option>
                    </select>
                </div>
       
    )
}


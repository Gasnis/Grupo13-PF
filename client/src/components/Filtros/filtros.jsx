import React ,{useState} from "react";
import { useDispatch } from "react-redux";
import { filterCategory, sortRating} from "../../redux/actions"
import style from "./filtros.module.css"

export default function Filter() {

    const dispatch = useDispatch();

    const [order, setOrder] = useState("");

    
    const handlerCategory = (event) => {
        event.preventDefault()
        dispatch(filterCategory(event.target.value))
    }

    const handleFilteredOrder =(event) => {
        event.preventDefault()
        dispatch(sortRating(event.target.value))
        setOrder(event.target.value)
    }

    return (    
            <div>
                <div>

                <select className={style.filter} onChange={(event)=>handleFilteredOrder(event)}>
                    <option value="all"></option>
                    <option value="mejor">Mejores</option>
                    <option value="peor">Peores</option>
                </select>

                </div>
                <div>
                    <select className={style.filter} onChange={(event)=>handlerCategory(event)}>
                        <option value="all">Todos</option>
                        <option value="pub">Pubs</option>
                        <option value="disco">Discotecas</option>
                        <option value="bar">Bares</option>
                    </select>
                </div>
            </div>
       
    )
}


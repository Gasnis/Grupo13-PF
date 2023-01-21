import React ,{useState} from "react";
import { useDispatch } from "react-redux";
import { filterCategory, sortRating } from "../../redux/actions"
import style from "./filtros.module.css"

export default function Filter() {

    const dispatch = useDispatch();
    const [order, setOrder] = useState("")
    console.log(order)
    
    const handlerCategory = (event) => {
        event.preventDefault()
        dispatch(filterCategory(event.target.value))
    }


    const handleFilteredOrder =(event) => {
        event.preventDefault()
        dispatch(sortRating(event.target.value))
        setOrder("sorted", event.target.value);
    }
    return (    
            <div>
                <div>

                <select className={style.filter} onChange={(e) => handleFilteredOrder(e)}>
                  <option value="asc">Mejores</option>
                  <option value="dec">Peores</option>
                </select>

                </div>
                <div>
                    <select className={style.filter} onChange={handlerCategory}>
                        <option value="all">Todos</option>
                        <option value="pub">Pubs</option>
                        <option value="disco">Discotecas</option>
                        <option value="bar">Bares</option>
                    </select>
                </div>
            </div>
       
    )
}


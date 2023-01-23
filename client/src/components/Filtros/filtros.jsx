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
// <<<<<<< HEAD
//     return (
//         <>
//             <div className={stateDropdown ? `${style.dropdown} ${style.open}` : `${style.dropdown}`} id="dropdown">
//                 <button onClick={() => handlerDropdownClicked()}>
//                     Filtrar <img src={arrow}></img>
//                 </button>
//                 <div id="menu" className={style.menu}>
//                     <div id="menuinner" className={style.menuinner}>
//                         <div className={style.containerCheck}>
//                             <input className={style.check} type="checkbox" onClick={() => handlerCategory("disco")} id="disco" />
//                             <label htmlFor="disco">Discoteca</label>
//                             <input className={style.check} type="checkbox" onClick={() => handlerCategory("bar")} id="bar" />
//                             <label htmlFor="bar">Bar</label>
//                             <input className={style.check} type="checkbox" onClick={() => handlerCategory("pub")} id="pub" />
//                             <label htmlFor="pub">Pub</label>
//                         </div>
//                         {/* <div className={style.mainmenu}>
//                             <button
//                                 onClick={handlerSubMenuClicked("mytools")}>
//                                 <span>build</span>Tools
//                                 <span>cevron_right</span>
//                             </button>
//                         </div>
//                         <div id="mytools" className="submenu">
//                             <button
//                                 onClick={handlerSubMenuClicked()}>
//                                 <span> arrow_back</span>Tools
//                             </button>
//                         </div> */}
//                     </div>
// =======

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
{/* >>>>>>> main */}
                </div>
            </div>
       
    )
}


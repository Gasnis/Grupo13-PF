import React, {useState} from "react";
import style from "./navbar.module.css"
import search from "../../utils/search.png"
import beer from "../../utils/beer.png"
import location from "../../utils/location.png"
import roulette from "../../utils/roulette.png"
import toggleOff from "../../utils/toggle.png"

export default function Navbar (props) {
    const [input, setInput] = useState("");

    const handleSearch = (e) => {

    }

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    return (
        <div className={style.Container}>
            <div>
                <img className={style.Logo} src={beer} alt="logo" />
                <h1>wwWhere</h1>
            </div>
            <div>
                <input value={input} onChange={handleChange} type="text" placeholder="Buscar bares, boliches y más"/>
                <button onClick={handleSearch} className={style.Button}>
                    <img className={style.Img} src={search} alt="" />
                </button>
                <button className={style.Button}>
                    <img className={style.Img} src={location} alt="" />
                </button>
                <button className={style.Button}>
                    <img className={style.Img} src={roulette} alt="" />
                </button>
            </div>
            <div>
                <button>Ordenar</button>
                <button>Filtrar</button>
                <button>Ingresar</button>
                <button className={style.Button}>
                    <img className={style.Img} src={toggleOff} alt="" />
                </button>
            </div>
        </div>
    )
}
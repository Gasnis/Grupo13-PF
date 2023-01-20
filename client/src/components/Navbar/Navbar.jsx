import React, { useState } from "react";
import { useDispatch } from "react-redux"
import style from "./navbar.module.css"
import search from "../../utils/search.png"
import beer from "../../utils/beer.png"
import location from "../../utils/location.png"
import roulette from "../../utils/roulette.png"
import arrow from "../../utils/Arrow 1.png"
import { searchPlace } from "../../redux/actions";
import { Link } from "react-router-dom"

export default function Navbar(props) {
    const isHome = props.home;
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(searchPlace(input));
    }

    const handleChange = (e) => {
        setInput(e.target.value)
    }


    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };


    return (
        <div className={isHome ? style.Container : style.ContainerNoHome}>
            <div>
                {isHome ? null : <Link to="/" className={style.link} href="/"><img src={arrow} /></Link>}
                <img className={style.Logo} src={beer} alt="logo" />
                <h1 className={isHome ? style.h1 : style.h1NoHome}>wwWhere</h1>
            </div>
            {isHome ?
                <div>
                    <input className={style.input} value={input} onChange={handleChange} type="search" placeholder="Buscar bares, boliches y más" />
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
                : null}
            <div>
                {isHome ?
                    <div>
                        <button className={style.Button}>Ordenar</button>
                        <button className={style.Button}>Filtrar</button>
                    </div>
                    : null}
                <label className={style.switch}>
                    <input type="checkbox" />
                    <span className={style.slider}></span>
                </label>

                <div>
                    <img src="https://i.pinimg.com/474x/2a/2e/7f/2a2e7f0f60b750dfb36c15c268d0118d.jpg" alt="" className={style.imagenprofile} onClick={handleOpen}/>
                    {open ? (
                        <div className={style.dropdown}>
                            <div>
                                <Link to="/login">Login</Link>
                            </div>
                            <div>
                                <Link to="/sign-up">Register</Link>
                            </div>
                            <div>
                                <Link to="/newplace">Create a Bar</Link>
                            </div>
                        </div>
                    ) : null}
                </div>



            </div>
        </div>
    )
}
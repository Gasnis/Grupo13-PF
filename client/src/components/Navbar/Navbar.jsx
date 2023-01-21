import React, { useEffect, useState } from "react";
import { useDispatch , useSelector} from "react-redux"
import style from "./navbar.module.css"
import beer from "../../utils/beer.png"
import location from "../../utils/location.png"
import roulette from "../../utils/roulette.png"
import arrow from "../../utils/Arrow 1.png"
import { searchPlace, setInput } from "../../redux/actions";
import Filtros from "../Filtros/filtros"
import { Link } from "react-router-dom"
import { logout } from "../../redux/actions";


export default function Navbar(props) {
    const isHome = props.home;
    const profile = useSelector(state => state.profile)
    const searchInput = useSelector(state=>state.searchInput);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        dispatch(setInput((e.target.value)))
    }

    useEffect(()=>{
        dispatch(searchPlace(searchInput))
    },[searchInput])

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    const handleLogOut = () => {
        dispatch(logout());
        alert("Sesión finalizada")
    }


    return (
        <div className={isHome ? style.Container : style.ContainerNoHome}>
            <div>
                {isHome ? null : <Link to="/" className={style.link} href="/"><img src={arrow} /></Link>}
                <img className={style.Logo} src={beer} alt="logo" />
                <h1 className={isHome ? style.h1 : style.h1NoHome}>wwWhere</h1>
            </div>
            {isHome ?
                <div>
                    <input className={style.searchbar} value={searchInput} onChange={handleChange} type="search" placeholder="Busca tu bar" />
                </div>
                : null}
            <div>
                {isHome ?
                    <div>
                        <button className={style.Button}>
                            <img className={style.Img} src={roulette} alt="" />
                        </button>
                        <button className={style.Button}>Ordenar</button>

                        
                        <Filtros></Filtros>
                        

                    </div>
                    : null}
                <label className={style.switch}>
                    <input type="checkbox" />
                    <span className={style.slider}></span>
                </label>
                <div>
                    <div>
                        <img src="https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png" alt="" className={style.imagenprofile} onClick={handleOpen}/>
                        {!profile.id &&
                        open ? (
                            <div className={style.dropdown}>
                                <div>
                                    <Link to="/login">Login</Link>
                                </div>
                                <div>
                                    <Link to="/sign-up">Register</Link>
                                </div>
                            </div>
                        ) : null
                        } 
                    </div>
                    <div>
                        {profile.id && 
                            open ? (
                            <div className={style.dropdown}>
                                <div>
                                    <Link to={`/profile/${profile.id}`}>My Profile</Link>
                                </div>
                                <div>
                                    <Link to="/newplace">Create a Bar</Link>
                                </div>
                                <div>
                                    <button className={style.logout} onClick={handleLogOut}>Cerrar Sesión</button>
                                </div>
                            </div>
                        ) : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
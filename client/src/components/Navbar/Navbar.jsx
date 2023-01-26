import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import style from "./navbar.module.css"
import beer from "../../utils/beer.png"
import roulette from "../../utils/roulette.png"
import arrow from "../../utils/Arrow 1.png"
import { searchPlace, setInput, setChecked } from "../../redux/actions";
import { logout } from "../../redux/actions";
import { useLocation, useNavigate, Link } from "react-router-dom";
import burguer from "../../utils/burguer.png"


export default function Navbar(props) {
    const isHome = props.home;
    const profile = useSelector(state => state.profile)
    const searchInput = useSelector(state => state.searchInput);
    const places = useSelector(state => state.places);
    const darkmode = useSelector(state => state.darkmode);
    const dispatch = useDispatch();
    const location = useLocation();


    const [openLogin, setOpenLogin] = useState(false);
    const [openBurguer, setOpenBurguer] = useState(false);


    const handleOpen = (drop) => {
        if (drop == "burguer") {
            setOpenBurguer(!openBurguer);
        } else {
            setOpenLogin(!openLogin);
        }

    };

    // const handleSearchBar = (e) => {
    //     dispatch(setInput(e.target.value))
    //     dispatch(searchPlace(e.target.value))
    // }

    const handleLogOut = () => {
        dispatch(logout());
    }
    const handleChangeSwitch = () => {
        dispatch(setChecked(darkmode));
    };

    return (
        <>
            {location.pathname === "/" ?

                <div className={style.Container}>
                    <div>
                        <img src={burguer} className={style.burguer} onClick={() => handleOpen("burguer")} alt=""></img>
                        {openBurguer ? (
                            <div className={style.dropdown2}>
                                <div className={style.titulos}>
                                    <h5 className={style.random}>Ruleta de Experiencias</h5>
                                    <Link to={`/detail/${places.map(a => a.id)[Math.floor(Math.random() * places.length)]}`}>
                                        <img className={style.Img} src={roulette} alt="" />
                                    </Link>
                                </div>
                                <div>
                                    About us
                                </div>
                            </div>
                        ) : null
                        }
                    </div>

                    <div>
                        <img className={style.Logo} src={beer} alt="logo" />
                    </div>
                    <div>
                        <label className={style.switch}>

                            <input type="checkbox" defaultChecked={darkmode} value={darkmode} onChange={handleChangeSwitch} />

                            <span className={style.slider} ></span>
                        </label>
                        <div>
                            <div>
                                <img src={profile.id ? profile.image : "https://i.pinimg.com/222x/57/70/f0/5770f01a32c3c53e90ecda61483ccb08.jpg"} alt="" className={style.imagenprofile} onClick={handleOpen} value="profile" />
                                {!profile.id &&
                                    openLogin ? (
                                    <div className={style.dropdown}>
                                        <div>
                                            <Link className={style.titulos} to="/login">Login</Link>
                                        </div>
                                        <div>
                                            <Link className={style.titulos} to="/sign-up">Register</Link>
                                        </div>
                                    </div>
                                ) : null
                                }
                            </div>
                            <div>
                                {profile.id &&
                                    openLogin ? (
                                    <div className={style.dropdown}>
                                        <div>
                                            <Link className={style.titulos} to={`/profile`}>Mi Perfil</Link>
                                        </div>
                                        <div>
                                            <Link className={style.titulos} to="/newplace">Suma tu sitio</Link>
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
                :
                <div className={style.Container}>
                    <Link to="/" className={style.link} href="/"><img src={arrow} /></Link>
                    <div>
                    <img className={style.Logo} src={beer} alt="logo" />
                    </div>
                    <label className={style.switch}>
                        <input type="checkbox" defaultChecked={darkmode} value={darkmode} onChange={handleChangeSwitch} />
                        <span className={style.slider} ></span>
                    </label>

                </div>
            }





            {/* {isHome ?
                <div>
                    <input className={style.searchbar} value={searchInput} onChange={handleSearchBar} type="search" placeholder="Busca tu bar" />
                </div>
            : null} */}
            {/* <div>
                {isHome ?
                    <div>
                        <h5 className={style.random}>Random?</h5>
                        <Link to={`/detail/${places.map(a => a.id)[Math.floor(Math.random() * places.length)]}`}>
                            <img className={style.Img} src={roulette} alt="" />

                        </Link>



                    </div>
                    : null} */}
        </>
    )
}

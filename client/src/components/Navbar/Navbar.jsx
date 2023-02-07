import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useLocation, Link } from "react-router-dom";
import { setChecked, sortRating, filterCategory, getPlaces, setInput } from "../../redux/actions";
import { logout } from "../../redux/actions";
import style from "./navbar.module.css"
import arrow from "../../utils/Arrow 1.png"
import swal from "sweetalert";
import wwwhere from "../../utils/wwwhere.png"
import burguer from "../../utils/burguer.png"
import roulette from "../../utils/roulette.png"
import { GiRoundStar } from "react-icons/gi";
import { GiBroom } from "react-icons/gi";
import { IoFilterSharp, IoPeopleSharp } from "react-icons/io5";
//los del menu hamburguesa
import categorylist from "../../utils/ListaNegra.png"
import favorito from "../../utils/favorito.png"
import arrowR from "../../utils/arrowRight.png"
import escoba from "../../utils/escoba.png"
import about from "../../utils/about.png"


export default function Navbar(props) {
    const profile = useSelector(state => state.profile)
    const places = useSelector(state => state.places);
    const darkmode = useSelector(state => state.darkmode);
    const dispatch = useDispatch();
    const location = useLocation();

    const [open, setOpen] = useState("");
    const [openSub, setOpenSub] = useState("");

    const orderSelection = document.querySelector("#orderSelection");
    const category = document.querySelector("#category");

    const handleOpen = (drop) => {
        switch (drop) {
            case "burguer":
                open === "burguer" ? setOpen("") : setOpen("burguer");
                break;
            case "login":
                open === "login" ? setOpen("") : setOpen("login");
                break;
        }
    };
    const handleOpenSub = (drop) => {
        switch (drop) {
            case "rating":
                openSub === "rating" ? setOpenSub("") : setOpenSub("rating");
                break;
            case "category":
                openSub === "category" ? setOpenSub("") : setOpenSub("category");
                break;
        }
    };
    const handleLogOut = () => {
        // if (window.confirm("Desea cerrar sesión?")) {
        //     window.alert("Sesión finalizada");
        //     dispatch(logout());
        // }

        swal({
            title: "Estas seguro que deseas cerrar sesion?",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willLogout) => {
                if (willLogout) {
                    swal("Sesion finalizada!", {
                        icon: "success",
                    });
                    dispatch(logout());
                }
            });
    }

    const handleChangeSwitch = () => {
        dispatch(setChecked(darkmode));
    };

    const handleFilteredOrder = (event) => {
        event.preventDefault()
        dispatch(sortRating(event.target.value))
    }

    const handlerCategory = (event) => {
        event.preventDefault()
        dispatch(filterCategory(event.target.value))
    }

    const refresh = (event) => {
        event.preventDefault();
        dispatch(getPlaces());
        category.selectedIndex = 0;
        orderSelection.selectedIndex = 0;
        dispatch(setInput(""))
    }

    return (
        <>
            {location.pathname === "/"
                ?
                <div className={darkmode ? style.Container : style.ContainerDark}>
                    <div className={style.leftContainer}>
                        <div className={style.about}>
                            <IoPeopleSharp className={darkmode ? style.icon : style.iconDark} />
                            <Link to="/about-us" className={darkmode ? style.select : style.selectDark}>Sobre wwWhere</Link>
                        </div>

                        <Link className={style.random} to={`/detail/${places.map(a => a.id)[Math.floor(Math.random() * places.length)]}`}>
                            <img className={style.rueda} src={roulette} alt="" /> 
                            <span className={darkmode ? style.select : style.selectDark}>Ruleta de Experiencias</span>
                        </Link>
                    </div>

                    <div className={style.middleContainer}><img className={style.Logo} src={wwwhere} alt="logo" /></div>

                    {/* --------------------------------------Contenedor opciones de la derecha----------------------------------- */}
                    <div className={style.rightContainer}>
                        <div onClick={() => handleOpenSub("rating")} alt="Donde comer?">
                            <GiRoundStar className={darkmode ? style.icon : style.iconDark}/>
                            <select id="orderSelection" onChange={(event) => handleFilteredOrder(event)} className={darkmode ? style.select : style.selectDark}>
                                <option value="all">Rating</option>
                                <option value="best">Mejores</option>
                                <option value="worst">Peores</option>
                            </select>
                        </div>

                        <div onClick={() => handleOpenSub("category")} alt="Donde comer?">
                            <IoFilterSharp className={darkmode ? style.icon : style.iconDark} />
                            <select id="category" onChange={(event) => handlerCategory(event)} className={darkmode ? style.select : style.selectDark}>
                                <option value="all">Categoría</option>
                                <option value="pub">Pubs</option>
                                <option value="disco">Discotecas</option>
                                <option value="bar">Bares</option>
                            </select>
                        </div>

                        <div>
                            <GiBroom className={darkmode ? style.icon : style.iconDark} />
                            <button onClick={refresh} className={darkmode ? style.select : style.selectDark}> Limpiar </button>
                        </div>

                        <label className={style.switch}>
                            <input type="checkbox" defaultChecked={darkmode} value={darkmode} onChange={handleChangeSwitch} />
                            <span className={style.slider} ></span>
                        </label>

                        <div>
                            <div>
                                <img src={profile.id ? profile.image : "https://i.pinimg.com/222x/57/70/f0/5770f01a32c3c53e90ecda61483ccb08.jpg"}
                                    alt="" className={style.imagenprofile} onClick={() => handleOpen("login")} value="profile" />
                                {!profile.id &&
                                    open === "login" ? (
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
                                    open === "login" ? (
                                    <div className={style.dropdown}>
                                        <div>
                                            {profile.name === "admin" ? <div> <Link className={style.titulos} to="/admin">Dashboard Admin</Link></div> : null}
                                        </div>

                                        <div>
                                            <Link className={style.titulos} to={`/profile`}>Mi Perfil</Link>
                                        </div>

                                        <div>
                                            <Link className={style.titulos} to="/newplace">Suma tu sitio</Link>
                                        </div>

                                        <div>
                                            <Link className={style.titulos} to="/bar-owner">Mis Locales</Link>
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
                    {/* --------------------------------------FIN Contenedor opciones de la derecha----------------------------------- */}



                    {/* -------------------------------------------------------MENU HAMBURGUESA--------------------------------------------------------------------- */}
                    <img src={burguer} className={style.burguer} onClick={() => handleOpen("burguer")} alt=""></img>
                    {open === "burguer" ? (
                        <div className={style.dropdown2}>
                            <div className={style.titulos}>
                                <Link className={style.random} to={`/detail/${places.map(a => a.id)[Math.floor(Math.random() * places.length)]}`}>
                                    <img className={style.Img} src={roulette} alt="" />
                                    Ruleta de Experiencias
                                </Link>
                            </div>

                            <div className={style.orderinline}>
                                <div onClick={() => handleOpenSub("rating")} alt="Donde comer?" className={style.orderinline}>
                                    <img className={style.favorite} src={favorito} />
                                    {/* <HiOutlineStar className={style.favorite}/> */}
                                    Rating
                                    <img src={arrowR} alt="Filtros" className={style.arrows} />
                                </div>
                                {openSub === "rating" &&
                                    <div className={style.filterRating}>
                                        <select id="orderSelection" className={style.filter} onChange={(event) => handleFilteredOrder(event)}>
                                            <option value="all">Rating</option>
                                            <option value="best">Mejores</option>
                                            <option value="worst">Peores</option>
                                        </select>
                                    </div>
                                }
                            </div>
                            <div className={style.orderinline}>
                                <div onClick={() => handleOpenSub("category")} alt="Donde comer?">
                                    <img className={style.category} src={categorylist} /> Categorías
                                    <img src={arrowR} alt="Filtros" className={style.arrows2} />
                                </div>
                                {openSub === "category" &&
                                    <div className={style.filterCategory}>
                                        <select id="category" onChange={(event) => handlerCategory(event)}>
                                            <option value="all">Categoría</option>
                                            <option value="pub">Pubs</option>
                                            <option value="disco">Discotecas</option>
                                            <option value="bar">Bares</option>
                                        </select>
                                    </div>
                                }
                            </div>
                            <div>
                                <button className={style.limpiar} onClick={refresh}>
                                    <img className={style.escoba} src={escoba} alt="lugares para comer" />Limpiar
                                </button>
                            </div>
                            <br />
                            <div className={style.about}>
                                <Link to="/about-us">  <img src={about} className={style.aboutimg} alt="sobre wwwere" />About us</Link>
                            </div>
                        </div>
                    ) : null
                    }
                    {/* -----------------------------------------------FIN MENU HAMBURGUESA-------------------------------------------------------------- */}
                </div>



                :
                // NavBar que se renderiza en otras rutas
                <div className={style.Container}>
                    <Link to="/" href="/"><img src={arrow} /></Link>
                    <div>
                        <img className={style.Logo} src={wwwhere} alt="logo" />
                    </div>
                    <label className={style.switch}>
                        <input type="checkbox" defaultChecked={darkmode} value={darkmode} onChange={handleChangeSwitch} />
                        <span className={style.slider} ></span>
                    </label>
                </div>
            }

        </>
    )
}

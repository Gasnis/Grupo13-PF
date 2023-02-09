import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useLocation, Link } from "react-router-dom";
import { setChecked, sortRating, filterCategory, getPlaces, setInput } from "../../redux/actions";
import { logout } from "../../redux/actions";
import style from "./navbar.module.css"
import arrow from "../../utils/Arrow 1.png"
import swal from "sweetalert";
import wwwhere from "../../utils/wwwhere.png"
import roulette from "../../utils/roulette.png"
import { GiRoundStar } from "react-icons/gi";
import { GiBroom } from "react-icons/gi";
import { IoFilterSharp, IoPeopleSharp, IoMenu, IoArrowBackCircleSharp } from "react-icons/io5";


export default function Navbar(props) {
    const profile = useSelector(state => state.profile)
    const places = useSelector(state => state.places);
    const darkmode = useSelector(state => state.darkmode);
    const dispatch = useDispatch();
    const location = useLocation();

    const [open, setOpen] = useState("");
    const [openSub, setOpenSub] = useState("");

    const [openBurger, setOpenBurger] = useState(false)

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
                <div className={darkmode ? style.navBarContainer : style.navBarContainerDark}>

                    <div className={style.burgerIconContainer}><IoMenu className={ darkmode ? style.burgerIcon : style.burgerIconDark} onClick={() => setOpenBurger(!openBurger)} /> </div>
                    <div className={style.middleContainer}><img className={style.Logo} src={wwwhere} alt="logo" /></div>

                    <div className={darkmode ? openBurger ?`${style.optionsContainer} ${style.open}` : style.optionsContainer : openBurger ?`${style.optionsContainerDark} ${style.open}` : style.optionsContainerDark}>

                        <div className={style.leftContainer} >
                            <div className={style.about}>
                                <IoPeopleSharp className={darkmode ? style.icon : style.iconDark} />
                                <Link to="/about-us" className={darkmode ? style.select : style.selectDark}>Sobre wwWhere</Link>
                            </div>

                            <Link className={style.random} to={`/detail/${places.map(a => a.id)[Math.floor(Math.random() * places.length)]}`}>
                                <img className={style.rueda} src={roulette} alt="" />
                                <span className={darkmode ? style.select : style.selectDark}>Ruleta de Experiencias</span>
                            </Link>
                        </div>
                    
                        <div className={style.rightContainer}>
                            <div onClick={() => handleOpenSub("rating")} alt="Donde comer?" className={style.filter}>
                                <GiRoundStar className={darkmode ? style.icon : style.iconDark} />
                                <select id="orderSelection" onChange={(event) => handleFilteredOrder(event)} className={darkmode ? style.select : style.selectDark}>
                                    <option hidden value="all">Rating</option>
                                    <option value="best">Mayor</option>
                                    <option value="worst">Menor</option>
                                </select>
                            </div>

                            <div onClick={() => handleOpenSub("category")} alt="Donde comer?" className={style.filter}>
                                <IoFilterSharp className={darkmode ? style.icon : style.iconDark} />
                                <select id="category" onChange={(event) => handlerCategory(event)} className={darkmode ? style.select : style.selectDark}>
                                    <option hidden value="all">Categoría</option>
                                    <option value="pub">Pubs</option>
                                    <option value="disco">Discotecas</option>
                                    <option value="bar">Bares</option>
                                </select>
                            </div>

                            <div className={style.filter}>
                                <GiBroom className={darkmode ? style.icon : style.iconDark} />
                                <button onClick={refresh} className={darkmode ? style.select : style.selectDark}> Limpiar </button>
                            </div>
                        </div>
                    </div>

                    <div className={style.profileYswitchContainer}>
                        <label className={style.switch}>
                            <input type="checkbox" defaultChecked={darkmode} value={darkmode} onChange={handleChangeSwitch} />
                            <span className={style.slider} ></span>
                        </label>
                        <div>
                            <img src={profile.id ? profile.image : "https://i.pinimg.com/222x/57/70/f0/5770f01a32c3c53e90ecda61483ccb08.jpg"}
                                alt="" className={style.imagenprofile} onClick={() => handleOpen("login")} value="profile" />
                            {!profile.id &&
                                open === "login" ? (
                                <div className={style.dropdown}>
                                    <div className={style.loginOption}>
                                        <Link className={style.titulos} to="/login">Login</Link>
                                    </div>
                                    <div>
                                        <Link className={style.titulos} to="/sign-up">Register</Link>
                                    </div>
                                </div>
                            ) : null
                            }
                        </div>
                        <div className={style.profileYswitch}>
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
                                        {profile.locals.length? <div>
                                            <Link className={style.titulos} to="/bar-owner">Mis Locales</Link>
                                        </div>:null}
                                       

                                    <div>
                                        <button className={style.logout} onClick={handleLogOut}>Cerrar Sesión</button>
                                    </div>
                                </div>
                            ) : null
                            }
                        </div>
                    </div>
                </div>
                :
                // NavBar que se renderiza en otras rutas
                <div className={darkmode ? style.navBarContainer : style.navBarContainerDark}>
                    {/* <Link to="/" href="/"><img src={arrow} /></Link> */}
                    <Link to="/" href="/"><IoArrowBackCircleSharp className={ darkmode ? style.arrowHome : style.arrowHomeDark} /></Link>
                    
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

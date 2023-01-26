import React, { useEffect, useState } from "react";
import { useDispatch , useSelector} from "react-redux"
import style from "./navbar.module.css"
import beer from "../../utils/beer.png"
import roulette from "../../utils/roulette.png"
import arrow from "../../utils/Arrow 1.png"
import { searchPlace, setInput,setChecked } from "../../redux/actions";
import { Link } from "react-router-dom"
import { logout } from "../../redux/actions";


export default function Navbar(props) {
    const isHome = props.home;
    const profile = useSelector(state => state.profile)
    const searchInput = useSelector(state=>state.searchInput);
    const places = useSelector(state=>state.places);
    const checked = useSelector(state=>state.checked);
    const dispatch = useDispatch();



    
    const [open, setOpen] = useState(checked);
   
    
    const handleOpen = () => {
        setOpen(!open);
    };
    
    const handleSearchBar = (e) => {
        dispatch(setInput(e.target.value))
        dispatch(searchPlace(e.target.value))
    }

    const handleLogOut = () => {
        dispatch(logout());
    }
    const handleChangeSwitch = () => {
        dispatch(setChecked(checked));
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
                    <input className={style.searchbar} value={searchInput} onChange={handleSearchBar} type="search" placeholder="Busca tu bar" />
                </div>
                : null}
            <div>
                {isHome ?
                    <div>
                        <h5 className={style.random}>Random?</h5>
                        <Link to={`/detail/${places.map(a => a.id)[Math.floor(Math.random() * places.length)]}`}>
                        <img className={style.Img} src={roulette} alt="" />
                            
                        </Link>

                        

                    </div>
                    : null}
                <label className={style.switch}>
                    <input type="checkbox" value={checked} onChange={handleChangeSwitch}/>
                    <span className={style.slider}></span>
                </label>
                <div>
                    <div>
                        <img src={profile.id?profile.image:"https://i.pinimg.com/222x/57/70/f0/5770f01a32c3c53e90ecda61483ccb08.jpg"} alt="" className={style.imagenprofile} onClick={handleOpen}/>
                        {!profile.id &&
                        open ? (
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
                            open ? (
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
    )
}
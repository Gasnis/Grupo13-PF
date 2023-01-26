import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { getUserByid } from "../../redux/actions";
import style from "./profile.module.css";
import { useHistory } from 'react-router-dom';



export default  function Detail() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { profile, allPlaces } = useSelector(state => state)

    useEffect(() => {
        dispatch(getUserByid(profile.id));
    }, [])
    
    if (!profile.id) {
        history.push("/")
    }

    if (!profile) {
        return (
            <div>
                <h3>loading...</h3>
            </div>
        )
    }
    return (
        <div className={style.profileContainer}>
            <Navbar />
            <hr />
            <div>
                <div className={style.divContainer} >
                    <img src={profile.image} href={profile.image} referrerpolicy="no-referrer" alt="perfil photo" className={style.profilePict} />
                    <h1 className={style.name}>{profile.name}</h1>
                </div>
              

                <div className={style.infoBarsAndInfoUser}>
                    <div className={style.divProfile}>
                        <span>Detalles del usuario: </span>
                        <p> <span>Teléfono: </span> {profile.phone}</p>
                        <p> <span>Fecha de nacimiento: </span> {profile.birthday}</p>
                        <p> <span>Ciudad:</span> {profile.city}</p>
                    </div>

                    <div className={style.localsInformation}>
                        <div>
                            <h2>Tus Reservas</h2>
                            {profile.locals?.length === 0 ?
                                <div className={style.divYourBars}>
                                    {profile.books?.map(l => {
                                        const localName = allPlaces.filter((place) => place.id === l.localId);

                                        return (
                                            <div className={style.infoBar}>
                                                <h1>{localName[0].name}</h1>
                                                <h4>dia de la reserva {l.reservedDate}</h4>
                                            </div>)
                                    })}
                                </div>
                                :
                                <div>
                                    <h1>Tus bares:</h1>
                                    <div className={style.divYourBars}>
                                        {profile.locals?.map(l => {
                                            return (
                                                <div className={style.infoBar}>
                                                    <h1>{l.name}</h1>
                                                    <img className={style.imgBar} src={l.image} alt="" />
                                                </div>)
                                        })}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>


                    {/* con la siguiete linea de codigo, pretendo que si un dueño de bar quiere reservar en una bar que no sea de su propiedad le aparezcan sus reservas */}
                    {profile.locals?.length > 0 && profile.books?.length > 0 ? <div className={style.booksInformation}>
                        <h1>Tus reservas:</h1>
                        <div className={style.divYourBars}>
                            {profile.books?.map(l => {
                                const localName = allPlaces.filter((place) => place.id === l.localId);

                                return (
                                    <div className={style.infoBar}>
                                        <h1>{localName[0].name}</h1>
                                        <h4>dia de la reserva {l.reservedDate}</h4>
                                    </div>)
                            })}
                        </div>
                        
                    </div> : null
                    }
                </div>
            </div>
        </div>
    )
}
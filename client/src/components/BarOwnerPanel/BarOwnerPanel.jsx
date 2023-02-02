import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import LocalsInfo from "../MyLocalsInfo/LocalsInfo";
import Navbar from "../Navbar/Navbar";
import { getUserByid } from "../../redux/actions";
import style from "./BarOwnerPanel.module.css"

export default function BarOwnerPanel() {
    const { profile, darkmode } = useSelector(state => state)
    const history = useHistory();
    const dispatch = useDispatch();

    const handleCreate = () => {
        history.push("/newplace")
    }

    useEffect(() => {
        dispatch(getUserByid(profile.id));
    }, [dispatch, profile.id])

    return (
        <>
            <Navbar />
            {/* <button onClick={handleVolver}>Volver al perfil</button> */}
            <div className={style.mainContainer}>
                <div className={darkmode ? style.localsContainer : style.localsContainerDark}>
                    <h1>Locales</h1>
                    {profile.locals?.length
                        ?
                        <LocalsInfo profileId={profile.id} locals={profile.locals} />
                        :
                        <div>
                            <h3>Actualmente no tienes ningún local</h3>
                            <button onClick={handleCreate} className={style.crearButton}>Crear local</button>
                        </div>}
                </div>

                {/* ------------------------------Igna--------------------------- */}
                <div className={darkmode ? style.localsContainer : style.localsContainerDark}>
                    <h1>Reservas</h1>
                </div>
            </div>
        </>
    )
}
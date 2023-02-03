import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditLocal from "../EditLocal/EditLocal";
import ShowLocalInfo from "../ShowLocalInfo/ShowLocalInfo";
import styles from "./localsInfo.module.css";

export default function LocalsInfo(props) {
    const locals = props.locals
    const checked = useSelector((state) => state.darkmode);
    const [index, setIndex] = useState(0);
    const [info, setInfo] = useState(false)
    const [editing, setEditing] = useState(false)
    const [localToEdit, setLocalToEdit] = useState("")
    const localsPerPage = 1;
    const localsToShow = locals.slice(localsPerPage * index, (index + 1) * localsPerPage)

    props.set(localsToShow[0].id)
    
    const handlePage = (e) => {
        e.preventDefault();
        switch (e.target.name) {
            case "right":
                if (index < Math.floor((locals.length - 1) / localsPerPage)) {
                    setIndex(index + 1);
                } else {
                    setIndex(0)
                }
                break;
            case "left":
                if (index * localsPerPage > 0) {
                    setIndex(index - 1);
                } else {
                    setIndex(Math.floor((locals.length - 1) / localsPerPage))
                }
                break;
            default:
                break;
        }
    }

    const handleDetails = (e) => {
        e.preventDefault();
        setInfo(!info);
        if (e.target.name !== "goBack") {
            setLocalToEdit(e.target.name)
        }
    }

    const handleEdit = (e) => {
        e.preventDefault();
        setEditing(!editing);
    }

    return (
        <div className={styles.localsContainer}>
            {!info
                ?

                <div className={checked ? styles.infoContainer : styles.infoContainerDark}>
                    {/* <h3>Tienes {locals.length} locales!</h3> */}
                    <div className={styles.CardContainer}>
                        <button className={styles.arrows} name="left" onClick={handlePage}>«</button>
                        <div className={styles.ContainCard}>
                            {localsToShow.map(local => (
                                <div key={local.id} className={checked ? styles.Card : styles.CardDark}>
                                    <h3>{local.name} {local.available ? null : "(desactivado)"}</h3>
                                    <img className={styles.CardImage} src={local.image} alt="" />
                                    {/* <h4>{local.category}</h4> */}
                                    <button name={local.id} onClick={handleDetails} className={checked ? styles.verDetalles : styles.verDetallesDark}>Ver detalles</button>
                                </div>
                            ))}
                        </div>
                        <button className={styles.arrows} name="right" onClick={handlePage}>»</button>
                    </div>
                </div>
                :
                (
                    !editing
                        ?
                        <div>
                            <ShowLocalInfo local={locals.filter(local => local.id === localToEdit)[0]} />
                            <div className={styles.buttonsContainer}>
                                <button onClick={handleEdit} className={checked ? styles.editarBar : styles.editarBarDark}>Editar</button>
                                <button name="goBack" onClick={handleDetails} className={styles.volver}>Volver</button>
                            </div>
                        </div>
                        :
                        <EditLocal userId={props.profileId} localToEdit={locals.filter(local => local.id === localToEdit)[0]} setEditing={setEditing} />
                )
            }
        </div>
    )
}
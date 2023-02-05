import React from "react";
import wwwhere from "../../utils/wwwhere.png";
import styles from "../Loading/Loading.module.css";

export default function Loading () {
    return(
        <div className={styles.container}>
            <img src={wwwhere} alt="" className={styles.logo} />
            <h1 className={styles.title}>Cargando...</h1>
        </div>
    )
}
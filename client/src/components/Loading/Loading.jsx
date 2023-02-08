import React, { useEffect } from "react";
import swal from "sweetalert";
import wwwhere from "../../utils/wwwhere.png";
import styles from "../Loading/Loading.module.css";



export default function Loading () {
    useEffect(() => {
        const timer = setTimeout(() => {
            swal({
                title: "No se encontro el lugar buscado",
                buttons: true,
                dangerMode: true,
            })
        }, 2000);
        return () => clearTimeout(timer);
      }, []);
    
    return(
        <div className={styles.container}>
            <img src={wwwhere} alt="" className={styles.logo} />
            <h1 className={styles.title}>Cargando...</h1>
        </div>
    )
}
import React from "react";
import styles from "./showLocalInfo.module.css"
import { useSelector } from "react-redux";

export default function ShowLocalInfo (props) {
    const local = props.local;
    const checked = useSelector((state) => state.darkmode);

    return (
        <div className={checked ? styles.localInfoContainer : styles.localInfoContainerDark}>
            <img className={styles.Image} src={local.image} alt="" />
            <h3 className={styles.Data}>Nombre: {local.name}</h3>
            <h3 className={styles.Data}>Teléfono: {local.phone}</h3>
            {/* <h3 className={styles.Data}>Dirección: {local.location}</h3> */}
            <h3 className={styles.Data}>Categoría: {local.category}</h3>
            <h3 className={styles.Data}>Precio de reserva: ${local.bookPrice}</h3>
            {local.schedule 
            ? 
            <h3 className={styles.Data}>Horarios: {local.schedule.slice(0, local.schedule.length-2).join("-")+" "}
            {local.schedule.slice(local.schedule.length-2).join("-")}</h3> 
            : null}
            <h3 className={styles.Data}>Capacidad: {local.capacity}</h3>
            <h3 className={styles.Data}>Rango de edad: {local.ageRange?.join("-")}</h3>
            {/* <h3 className={styles.Data}>Menú: {local.menu}</h3> */}
            <h3 className={styles.Data}>Estado: {local.available ? "Abierto" : "Cerrado"}</h3>
            <h3 className={styles.Data}>{local.event ? "Evento disponible" : "Evento no disponible"}</h3>
            <h3 className={styles.Data}>{local.petFriendly ? null : "No"} Pet Friendly</h3>
            <h3 className={styles.Data}>{local.promo ? `Promo actual: ${local.promo}` : "Sin promo disponible"}</h3>
        </div>
    )
}
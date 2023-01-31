import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from "./Dashboard.module.css"

const Dashboard = () => {

    const solicitudes = useSelector((state)=> state.places)

  return (
    <div className={style.navbar}>
        <div className={style.titulos}>
            <p>Solicitudes</p>
            <p>Locales</p>
            <p>Usuarios</p>
            <p>Baneados</p>
        </div>
        <div>
            <p>SearchBar</p>
        </div>
        
    </div>
  )
}

export default Dashboard
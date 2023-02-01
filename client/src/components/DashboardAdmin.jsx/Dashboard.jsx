import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from "./Dashboard.module.css"
import { useState } from 'react';
import { getUser } from '../../redux/actions';
import { useEffect } from 'react';
// import { approveLocal } from '../../redux/actions';
import { updatePlace, getPlaces , deletePlace, searchPlace, searchUser} from '../../redux/actions';


const Dashboard = () => {
  
  const dispatch = useDispatch()
  useEffect(()=>{dispatch(getUser())
  dispatch(getPlaces())},[])
  const allPlaces = useSelector((state)=> state.places)
  const allUsers = useSelector((state)=> state.users)
  
  const [statusDashboard, setStatusDashboard] = useState("Solicitudes")

  const handleState= (e) => {
    setStatusDashboard(e.target.value)
  }

  const handleApprove = async (e) => {
    const local = allPlaces?.filter(p=>p.status === "solicitud").find(local => local.id === e.target.value)
    await dispatch(updatePlace({...local, status: 'aprobado'}))
    dispatch(getPlaces())
 
  }

  const handleDenegate = async (e) =>{
    await dispatch(deletePlace(e.target.value))
    dispatch(getPlaces())
  }

  const handleSearchBar = async(e) => {
    await dispatch(searchPlace(e.target.value))
    await dispatch(searchUser(e.target.value))
}





  return (
    <div>
    <div className={style.navbar}>
        <div className={style.titulos}>
            <button className={style.botones} value="Solicitudes" onClick={handleState}>Solicitudes</button>
            <button className={style.botones} value="Locales" onClick={handleState}>Locales</button>
            <button className={style.botones} value="LocalesBaneados" onClick={handleState}>Locales Baneados</button>
            <button className={style.botones} value="Usuarios" onClick={handleState}>Usuarios</button>
            <button className={style.botones} value="UsuariosBaneados" onClick={handleState}>Usuarios Baneados</button>
        </div>
        
    <div>
      <input  onChange={handleSearchBar} type="search" placeholder="Busca tu bar" />
    </div>

      </div>
      
      
      {/* ------------------------------solicitudes---------------------------------------------------------------- */}
      {statusDashboard === "Solicitudes"?<div>
      {allPlaces?.filter(p=>p.status === "solicitud")?.map((p) => {return <div className={style.card} key={p.id}>
            <div className={style.cosito}>            
                <img src={p.image} alt="" height="30px" width="30px"/>     
                   {p.name}
            </div>
            <div className={style.cosito}>
                {p.phone}
            </div>

            <div className={style.cosito}>
                {p.userId}
            </div>

            <div className={style.cosito}>
                {/* <img src={aproved} height="40px" onClick={handleApprove}/> */}
                <button value={p.id} onClick={handleApprove}>accept</button>
                <button value={p.id} onClick={handleDenegate} >X</button>
                <button>B</button>
            </div>
        
        </div> 
    })}
      </div>:null}
      
      
      {/* ------------------------------locales---------------------------------------------------------------- */}
      {statusDashboard === "Locales"?<div>
      {allPlaces?.filter(p=>p.status === "aprobado")?.map((p) => {return <div className={style.card} >
      <div className={style.cosito}>            
                <img src={p.image} alt="" height="30px" width="30px"/>     
                   {p.name}
            </div>
            <div className={style.cosito}>
                {p.phone}
            </div>

            <div className={style.cosito}>
                {p.userId}
            </div>

            <div className={style.cosito}>
                {/* <img src={aproved} height="40px" onClick={handleApprove}/> */}
                <button value={p.id} onClick={handleApprove}>accept</button>
                <button value={p.id} onClick={handleDenegate} >X</button>
                <button>B</button>
            </div>
        </div> })}
      </div>:null}
      
      
      {/* ------------------------------Locales baneados---------------------------------------------------------------- */}
      {statusDashboard === "LocalesBaneados"?<div>

      {allPlaces?.filter(p=>p.status === "baneado")?.map((p) => {return <div className={style.card} >
                <div className={style.cosito}>            
                  <img src={p.image} alt="" height="30px" width="30px"/>     
                  {p.name}
                </div>
                <div className={style.cosito}>
                    {p.phone}
                </div>

                <div className={style.cosito}>
                    {p.userId}
                </div>

                <div className={style.cosito}>
                    {/* <img src={aproved} height="40px" onClick={handleApprove}/> */}
                    <button value={p.id} onClick={handleApprove}>accept</button>
                    <button value={p.id} onClick={handleDenegate} >X</button>
                    <button>B</button>
                </div>
            </div> })}
      </div>:null}
      
      {/* ------------------------------usuarios---------------------------------------------------------------- */}
      {statusDashboard === "Usuarios"?<div>

      {allUsers?.filter (u => u.ban === false)?.map((u) => {return <div className={style.card}>

        <div className={style.cosito}>
          <img src={u.image} alt="" height="30px" width="30px" />
          {u.name}
        </div>
        <div className={style.cosito}>
          {u.phone}
        </div>
        <div className={style.cosito}>
          {u.id}
        </div>
        <div className={style.cosito}>
          <button>BANEAR</button>
        </div>
        
      
      
      </div> })}
      </div>:null}

      {/* ------------------------------usuariosBaneados---------------------------------------------------------------- */}
      {statusDashboard === "UsuariosBaneados"?<div>

      { allUsers?.filter (u => u.ban === true)?.map((u) => {return <div className={style.card} >{u.name}<button>DESBANEAR</button><hr/></div> })}
      </div>:null}
    </div>
  )
}

export default Dashboard
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from "./Dashboard.module.css"
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { getUser } from '../../redux/actions';
import { useEffect } from 'react';
// import { approveLocal } from '../../redux/actions';
import { updatePlace, getPlaces , deletePlace, searchPlace, searchUser,updateUser} from '../../redux/actions';
import Navbar from '../Navbar/Navbar';


const Dashboard = () => {
  const profile  = useSelector(state => state.profile)
  const history = useHistory()
  const dispatch = useDispatch()
  useEffect(()=>{dispatch(getUser())
  dispatch(getPlaces())},[])
  useEffect(() => {
    if (profile.id!=="admin@admin.admin") {
        history.push("/login")
    }
})

  const allPlaces = useSelector((state)=> state.places)
  const allUsers = useSelector((state)=> state.users)
  const darkmode = useSelector((state)=> state.darkmode)
  
  const [statusDashboard, setStatusDashboard] = useState("Welcome")

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

const handleBanUser = async (e) => {
  const user = allUsers?.find(user => user.id === e.target.value)
  await dispatch(updateUser({...user, ban: true, userId:user.id}))
  await dispatch((getUser()))
}

const handlePardonUser = async (e) => {
  const user = allUsers?.find(user => user.id === e.target.value)
  await dispatch(updateUser({...user, ban: false, userId:user.id}))
  await dispatch(dispatch(getUser()))
}

const handleSolicitud = async (e) => {
  const local = allPlaces?.find(local => local.id === e.target.value)
  await dispatch(updatePlace({...local, status: 'solicitud'}))
  dispatch(getPlaces())

}


const handleBanPlace = async (e) => {
  const local = allPlaces?.find(local => local.id === e.target.value)
  await dispatch(updatePlace({...local, status: "baneado"}))
  dispatch(getPlaces())
}

const handlePardonPlace = async (e) => {
  const local = allPlaces?.find(local => local.id === e.target.value)
  await dispatch(updatePlace({...local, status: "solicitud"}))
  dispatch(getPlaces())
}


  return (
    <div>
      <Navbar/>
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
      {allPlaces?.filter(p=>p.status === "solicitud")?.map((p) => {return <div className={darkmode?style.card:style.carddark} key={p.id}>
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
                <button value={p.id} onClick={handleApprove}>Aceptar</button>
                <button value={p.id} onClick={handleDenegate} >X</button>
                <button value={p.id} onClick={handleBanPlace}  >Banear</button>
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
                <button value={p.id} onClick={handleSolicitud}>Solicitud</button>
                <button value={p.id} onClick={handleDenegate} >X</button>
                <button value={p.id} onClick={handleBanPlace} >Banear</button>
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
                    <button value={p.id} onClick={handleApprove}>Aceptar</button>
                    <button value={p.id} onClick={handleDenegate} >X</button>
                    <button value={p.id} onClick={handlePardonPlace} >perdonar</button>
                </div>
            </div> })}
      </div>:null}
      
      {/* ------------------------------usuarios---------------------------------------------------------------- */}
      {statusDashboard === "Usuarios"?<div>

      {allUsers?.filter (u => u.ban === false && u.name!== "admin")?.map((u) => {return <div className={style.card}>

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
          <button value={u.id} onClick={handleBanUser} >Banear</button>
        </div>
        
      
      
      </div> })}
      </div>:null}

      {/* ------------------------------usuariosBaneados---------------------------------------------------------------- */}
      {statusDashboard === "UsuariosBaneados"?<div>

      { allUsers?.filter (u => u.ban === true && u.name!== "admin")?.map((u) => {return <div className={style.card} >{u.name}<button value={u.id} onClick={handlePardonUser} >Pardon</button><hr/></div> })}
      </div>:null}
      {/* ----------------------------------Welcome------------------------------------------------------------------- */}
      {statusDashboard === "Welcome"?<div><h1>Welcome admin</h1></div>:null

      }
    </div>
  )
  
}

export default Dashboard
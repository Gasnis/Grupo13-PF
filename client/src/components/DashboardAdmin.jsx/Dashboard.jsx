import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from "./Dashboard.module.css"
import { useState } from 'react';
import { getUser } from '../../redux/actions';
import { useEffect } from 'react';
// import { approveLocal } from '../../redux/actions';
import { updatePlace, getPlaces , deletePlace} from '../../redux/actions';


const Dashboard = () => {
  
  const dispatch = useDispatch()
  useEffect(()=>{dispatch(getUser())
  dispatch(getPlaces())},[])
  const allPlaces = useSelector((state)=> state.allPlaces)
  const allUsers = useSelector((state)=> state.allUsers)
  
  const soli = allPlaces?.filter(p=>p.status === "solicitud")
  const bane = allPlaces?.filter(p=>p.status === "baneado")
  const apro = allPlaces?.filter(p=>p.status === "aprobado")
  const bannedUsers = allUsers?.filter (u => u.ban === true)
  const NonBannedUsers = allUsers?.filter (u => u.ban === false)

  
  const [statusDashboard, setStatusDashboard] = useState("Solicitudes")
  const [data, setData] = useState({
    soli: soli,
    bane: bane,
    apro: apro,
    bannedUsers: bannedUsers,
    NonBannedUsers: NonBannedUsers,
  })

  const handleState= (e) => {
    setStatusDashboard(e.target.value)
  }
  const handleSearchSoli = (e) => {
      const newData = soli.filter((local) =>local.name.toLowerCase().includes(e.target.value.toLowerCase()));
      setData({...data, soli: newData})
  }
  const handleSearchBane = (e) => {
    const newData = bane.filter((local) =>local.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setData({...data, bane: newData})
  }
  const handleSearchApro = (e) => {
    const newData = apro.filter((local) =>local.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setData({...data, apro: newData})
  }
  const handleSearchBannedUsers = (e) => {
    const newData = bannedUsers.filter((local) =>local.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setData({...data, bannedUsers: newData})
  }
  const handleSearchNonBannedUsers = (e) => {
    const newData = NonBannedUsers.filter((local) =>local.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setData({...data, NonBannedUsers: newData})
  }


  const handleApprove = async (e) => {
    const local = data.soli.find(local => local.id === e.target.value)

    await dispatch(updatePlace({...local, status: 'aprobado'}))

    await dispatch(getPlaces())

    window.location.reload()
 
  }

  const handleDenegate = async (e) =>{
    await dispatch(deletePlace(e.target.value))
    await dispatch(getPlaces())
    window.location.reload()
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
        


      </div>
      
      
      {/* ------------------------------solicitudes---------------------------------------------------------------- */}
      {statusDashboard === "Solicitudes"?<div>
      <div>
            <input  name="Solicitudes" onChange={handleSearchSoli} type="search" placeholder="Buscar..." />
      </div>
      {data.soli?.map((p) => {return <div className={style.card} key={p.id}>
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
      <div>
            <input name="Locales" onChange={handleSearchApro} type="search" placeholder="Buscar..." />
      </div> <hr />
      {data.apro?.map((p) => {return <div className={style.card} >{p.name}<button>SIMBOLO</button><button>BANEAR</button><hr/></div> })}
      </div>:null}
      
      
      {/* ------------------------------Locales baneados---------------------------------------------------------------- */}
      {statusDashboard === "LocalesBaneados"?<div>
      <div>
            <input name="LocalesBaneados" onChange={handleSearchBane} type="search" placeholder="Buscar..." />
      </div> <hr />
      {data.bane?.map((p) => {return <div className={style.card} >{p.name}<button>DESBANEAR</button><hr/></div> })}
      </div>:null}
      
      {/* ------------------------------usuarios---------------------------------------------------------------- */}
      {statusDashboard === "Usuarios"?<div>
      <div>
            <input name="Usuarios" onChange={handleSearchNonBannedUsers} type="search" placeholder="Buscar..." />
      </div> <hr />
      {data.NonBannedUsers?.map((p) => {return <div className={style.card}>

        <div>{p.name}</div>
        <button>BANEAR</button><hr/>
        
      
      
      </div> })}
      </div>:null}

      {/* ------------------------------usuariosBaneados---------------------------------------------------------------- */}
      {statusDashboard === "UsuariosBaneados"?<div>
      <div>
            <input name="UsuariosBaneados" onChange={handleSearchBannedUsers} type="search" placeholder="Buscar..." />
      </div> <hr />
      {data.bannedUsers?.map((p) => {return <div className={style.card} >{p.name}<button>DESBANEAR</button><hr/></div> })}
      </div>:null}
    </div>
  )
}

export default Dashboard
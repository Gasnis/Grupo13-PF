import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from "./Dashboard.module.css"
import { useState } from 'react';
import { getUser } from '../../redux/actions';
import { useEffect } from 'react';



const Dashboard = () => {
  
  const dispatch = useDispatch()
  useEffect(()=>{dispatch(getUser())},[])
  const allPlaces = useSelector((state)=> state.allPlaces)
  const allUsers = useSelector((state)=> state.allUsers)
  
  const soli = allPlaces?.filter(p=>p.status === "solicitud")
  const bane = allPlaces?.filter(p=>p.status === "baneado")
  const apro = allPlaces?.filter(p=>p.status === "aprobado")
  const bannedUsers = allUsers?.filter (u => u.ban === true)
  const NonBannedUsers = allUsers?.filter (u => u.ban === false)
  
  const [statusDashboard, setStatusDashboard] = useState("Solicitudes")
  
  const handleState= (e) => {
    setStatusDashboard(e.target.value)
  }
  const handleSearch = (e) => {
    if (e.target.name === "Solicitudes") {

      // completar aca

    }
}


  return (
    <div>
    <div className={style.navbar}>
        <div className={style.titulos}>
            <button value="Solicitudes" onClick={handleState}>Solicitudes</button>
            <button value="Locales" onClick={handleState}>Locales</button>
            <button value="LocalesBaneados" onClick={handleState}>Locales Baneados</button>
            <button value="Usuarios" onClick={handleState}>Usuarios No Baneados</button>
            <button value="UsuariosBaneados" onClick={handleState}>Usuarios Baneados</button>
        </div>
        


      </div>
      
      
      {/* ------------------------------solicitudes---------------------------------------------------------------- */}
      {statusDashboard === "Solicitudes"?<div>
      <div>
            <input name="Solicitudes" onChange={handleSearch} type="search" placeholder="Buscar..." />
      </div> <hr />
      {soli?.map((p) => {return <div>{p.name}<button>APROBAR</button><button>DESAPROBAR</button><button>BANEAR</button><hr/></div> })}
      </div>:null}
      
      
      {/* ------------------------------locales---------------------------------------------------------------- */}
      {statusDashboard === "Locales"?<div>
      {apro?.map((p) => {return <div>{p.name}<button>SIMBOLO</button><button>BANEAR</button><hr/></div> })}
      </div>:null}
      
      
      {/* ------------------------------Locales baneados---------------------------------------------------------------- */}
      {statusDashboard === "LocalesBaneados"?<div>
      {bane?.map((p) => {return <div>{p.name}<button>DESBANEAR</button><hr/></div> })}
      </div>:null}
      
      {/* ------------------------------usuarios---------------------------------------------------------------- */}
      {statusDashboard === "Usuarios"?<div>
      {NonBannedUsers?.map((p) => {return <div>{p.name}<button>BANEAR</button><hr/></div> })}
      </div>:null}

      {/* ------------------------------usuariosBaneados---------------------------------------------------------------- */}
      {statusDashboard === "UsuariosBaneados"?<div>
      {bannedUsers?.map((p) => {return <div>{p.name}<button>DESBANEAR</button><hr/></div> })}
      </div>:null}
    </div>
  )
}

export default Dashboard
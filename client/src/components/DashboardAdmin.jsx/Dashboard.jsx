import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from "./Dashboard.module.css"
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { getUser } from '../../redux/actions';
import { useEffect } from 'react';
// import { approveLocal } from '../../redux/actions';
import { updatePlace, getPlaces, deletePlace, searchPlace, searchUser, updateUser } from '../../redux/actions';
import Navbar from '../Navbar/Navbar';
import swal from "sweetalert"


const Dashboard = () => {
  const profile = useSelector(state => state.profile)
  const history = useHistory()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUser())
    dispatch(getPlaces())
  }, [])
  useEffect(() => {
    if (profile.id !== "admin@admin.admin") {
      history.push("/login")
    }
  })

  const allPlaces = useSelector((state) => state.places)
  const allUsers = useSelector((state) => state.users)
  const darkmode = useSelector((state) => state.darkmode)

  const [statusDashboard, setStatusDashboard] = useState("Welcome")

  const handleState = (e) => {
    setStatusDashboard(e.target.value)
  }

  const handleApprove = async (e) => {
    swal({
      title: "Estas seguro?",
      text: "Una vez aprobado este local va a pasar al home!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(async (willDelete) => {
        if (willDelete) {
          swal("APROBADO! Hay un nuevo bar en wwwhere!", {
            icon: "success",
          });
          const local = allPlaces?.filter(p => p.status === "solicitud").find(local => local.id === e.target.value)
          await dispatch(updatePlace({ ...local, status: 'aprobado' }))
          await dispatch(getPlaces())
        }
      });
  }

  const handleDenegate = async (e) => {
    swal({
      title: "Estas seguro?",
      text: "Se va a ELIMINAR el local y avisar a su creador!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(async (willDelete) => {
        if (willDelete) {
          swal("APROBADO! Hay un nuevo bar en wwwhere!", {
            icon: "success",
          });
          await dispatch(deletePlace(e.target.value))
          await dispatch(getPlaces())
        }
      });
  }

  const handleSearchBar = async (e) => {
    await dispatch(searchPlace(e.target.value))
    await dispatch(searchUser(e.target.value))
  }

  
  const handleBan = async (e) => {
    allPlaces?.filter(locales => locales.userId === e.target.value).forEach(async local => {
      await dispatch(deletePlace(local.id))
    });
    
    const userban = allUsers?.find(user => user.id === e.target.value)
    await dispatch(updateUser({ ...userban.id, ban: true , userId:e.target.value }))

    await dispatch(getPlaces())
    await dispatch(getUser())
  }
  
  const handlePardonUser = async (e) => {
    swal({
      title: "Estas seguro?",
      text: "Una vez perdonado este usuario puede volver a crear bares!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(async (willDelete) => {
        if (willDelete) {
          swal("PERDONADO!Este bar volvio a formar parte de wwwhere!", {
            icon: "success",
          });
          const user = allUsers?.find(u => u.id === e.target.value)
          await dispatch(updatePlace({ ...user, ban: false , userId: e.target.value}))
          await dispatch(getPlaces())
        }
      });
  }
  
  const handleDisbled = async(e) =>{
      const local = allPlaces?.find(p => p.id === e.target.value)
      await dispatch(updatePlace({ ...local, available: false }))
      await dispatch(getPlaces())
  }

  const handleEnabled = async(e) =>{
    const local = allPlaces?.find(p => p.id === e.target.value)
    await dispatch(updatePlace({ ...local, available: true , status : "aprobado"}))
    await dispatch(getPlaces())
}


  return (
    <div>
      <Navbar />
      <div className={style.navbar}>
        <div className={style.titulos}>
          <button className={style.botones} value="Solicitudes" onClick={handleState}>Solicitudes</button>
          <button className={style.botones} value="Locales" onClick={handleState}>Locales</button>
          <button className={style.botones} value="LocalesDisabled" onClick={handleState}>Locales Deshabilitados</button>
          <button className={style.botones} value="Usuarios" onClick={handleState}>Usuarios</button>
          <button className={style.botones} value="UsuariosBaneados" onClick={handleState}>Usuarios Baneados</button>
        </div>

        <div>
          <input onChange={handleSearchBar} type="search" placeholder="Busca tu bar" />
        </div>

      </div>


      {/* ------------------------------solicitudes---------------------------------------------------------------- */}
      {statusDashboard === "Solicitudes" ? <div>
        {allPlaces?.filter(p => p.status === "solicitud" && p.available)?.map((p) => {
          return <div className={darkmode ? style.card : style.carddark} key={p.id}>
            <div className={style.cosito}>
              <img src={p.image} alt="" height="30px" width="30px" />
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
              <button value={p.userId} onClick={handleBan}>Banear</button>
            </div>

          </div>
        })}
      </div> : null}


      {/* ------------------------------locales---------------------------------------------------------------- */}
      {statusDashboard === "Locales" ? <div>
        {allPlaces?.filter(p => p.status === "aprobado" && p.available)?.map((p) => {
          return <div className={style.card} >
            <div className={style.cosito}>
              <img src={p.image} alt="" height="30px" width="30px" />
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
              <button value={p.id} onClick={handleDisbled}>Desahabilitar</button>
              <button value={p.id} onClick={handleDenegate}>X</button>
              <button value={p.id} onClick={handleBan}>Banear</button>
            </div>
          </div>
        })}
      </div> : null}


      {/* ------------------------------Locales baneados---------------------------------------------------------------- */}
      {statusDashboard === "LocalesDisabled" ? <div>

        {allPlaces?.filter(p => p.available === false)?.map((p) => {
          return <div className={style.card} >
            <div className={style.cosito}>
              <img src={p.image} alt="" height="30px" width="30px" />
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
              <button value={p.id} onClick={handleEnabled}>Habilitar</button>
            </div>
          </div>
        })}
      </div> : null}

      {/* ------------------------------usuarios---------------------------------------------------------------- */}
      {statusDashboard === "Usuarios" ? <div>

        {allUsers?.filter(u => u.ban === false && u.name !== "admin")?.map((u) => {
          return <div className={style.card}>

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
              <button value={u.id} onClick={handleBan} >Banear</button>
            </div>



          </div>
        })}
      </div> : null}

      {/* ------------------------------usuariosBaneados---------------------------------------------------------------- */}
      {statusDashboard === "UsuariosBaneados" ? <div>

        {allUsers?.filter(u => u.ban === true && u.name !== "admin")?.map((u) => {
          return <div className={style.card} >
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
            <button value={u.id} onClick={handlePardonUser} >Desbanear</button>
          </div>
        </div>
        })}
          </div>:null
      }
        {/* ----------------------------------Welcome------------------------------------------------------------------- */}
        {statusDashboard === "Welcome" ? <div><h1>Welcome admin</h1></div> : null

        }
      </div>
  )
  
}

      export default Dashboard
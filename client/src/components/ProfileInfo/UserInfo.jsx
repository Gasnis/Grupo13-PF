import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/actions";
import styles from "./profileInfo.module.css"

const validate = (input) => {
    let errors = {};
    if (!input.name.length) errors.name = "'Nombre' no puede ser un campo vacío.";
    if (input.phone < 0 || !input.phone ) errors.phone = "Debes escribir un número de teléfono válido.";
    if (!input.password) errors.password = "Debes asignar una contraseña.";
    return errors;
}

export default function ProfileInfo (props) {
    const dispatch = useDispatch();
    const {name, password, phone, city, id} = props.profile
    const [editing, setEditing] = useState(false);
    const [input, setInput] = useState({
        ...props.profile,
        userId:id
    });
    const [errors, setErrors] = useState({
        name: "",
        password: "",
        phone: "",
    })
    const disabled = errors.name || errors.password || errors.phone;
    
    const handleEdit = (e) => {
        e.preventDefault();
        setEditing(true)
    }

    const handleSave =async (e)=>{
        e.preventDefault();
        const infoUpdated = await dispatch(updateUser(input))
        if (infoUpdated.payload.id){
            setEditing(false);
            // alert("Cambios guardados exitosamente!")
        }else{
            alert(infoUpdated.response.data)
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setEditing(false);
        setInput({
            ...props.profile,
            userId: id,
        })
    }

    const handleChange = (e) => {
        setErrors(validate({
            ...input,
            [e.target.name]:e.target.value
        }))
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }

    return (
        <div className={styles.MainContainer}>
            {editing ? null : <button className={styles.EditButton} onClick={handleEdit}>Editar</button>}
            <form className={styles.Form} onSubmit={handleSave}>
                <div className={styles.DivLabel}>
                    <label className={styles.Label}>Nombre: </label>
                    {!editing 
                    ? 
                        <p className={styles.Input}>{name}</p> 
                    : 
                        <div className={styles.DivInput}>
                            <input className={styles.Input} onChange={handleChange} value={input.name} name="name" type="text" />
                            {errors.name ? <span className={styles.Errors}>{errors.name}</span> : null}
                        </div>
                    }
                </div>
                <div className={styles.DivLabel}>
                    <label className={styles.Label}>Constraseña: </label>
                    {!editing 
                    ? 
                        <p className={styles.Input}>{password}</p> 
                    : 
                        <div className={styles.DivInput}>
                            <input className={styles.Input} onChange={handleChange} value={input.password} name="password" type="text" />
                            {errors.password ? <span className={styles.Errors}>{errors.password}</span> : null}
                        </div>
                    }
                </div>
                <div className={styles.DivLabel}>
                    <label className={styles.Label}>Teléfono: </label>
                    {!editing 
                    ?
                        <p className={styles.Input}>{phone}</p> 
                    : 
                        <div className={styles.DivInput}>
                            <input className={styles.Input} onChange={handleChange} value={input.phone} name="phone" type="number" />
                            {errors.phone ? <span className={styles.Errors}>{errors.phone}</span> : null}
                        </div>
                    }
                </div>
                <div className={styles.DivLabel}>
                    <label className={styles.Label}>Ciudad: </label>
                    {!editing 
                    ? 
                        <p className={styles.Input}>{city}</p> 
                    : 
                        <input className={styles.Input} onChange={handleChange} value={input.city} name="city" type="text" />
                    }
                </div>
                { editing
                ?
                    <div className={styles.ButtonsDiv}>
                        <button className={styles.Button} disabled={disabled} type="submit">Guardar</button>
                        <button className={styles.Button} onClick={handleCancel}>Cancelar</button>
                    </div>
                :
                    null
                }
            </form>
                
        </div>
    )
}


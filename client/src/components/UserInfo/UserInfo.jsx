import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/actions";
import styles from "../UserInfo/userInfo.module.css"
import swal from "sweetalert";
import { getUserByid } from "../../redux/actions";

const validate = (input) => {
    let errors = {};
    if (!input.name.length) errors.name = "'Nombre' no puede ser un campo vacío.";
    if (input.phone < 0 || !input.phone) errors.phone = "Número de teléfono inválido.";
    if (!input.password) errors.password = "Debes asignar una contraseña.";
    return errors;
}

export default function ProfileInfo(props) {
    const dispatch = useDispatch();
    const checked = useSelector((state) => state.darkmode);
    const { name, password, phone, city, id } = props.profile
    const [editing, setEditing] = useState(false);
    const [input, setInput] = useState({
        ...props.profile,
        userId: id
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
    

    const handleSave = async (e) => {
        e.preventDefault();
        // if (window.confirm("Desea guardar estos cambios?")) {
        //     const infoUpdated = await dispatch(updateUser(input))
        //     if (infoUpdated.id) {
        //         setEditing(false);
        //         window.alert("Datos exitosamente guardados");
        //     } else {
        //         alert(infoUpdated.response.data)
        //     }
        // }
        swal({
            title: "Desea guardar estos cambios?",
            text: "Se actualizara la informacion de tu perfil",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willSave) => {
                if (willSave) {
                    const infoUpdated = await dispatch(updateUser(input))
                    if (infoUpdated.id) {
                        setEditing(false);
                        dispatch(getUserByid(props.profile.id));
                        swal("Datos exitosamente guardados!", {
                            icon: "success",
                        });
                        } else {
                            swal(infoUpdated.response.data, {
                                icon: "error",
                            });
                        }
                    }
                });
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
            [e.target.name]: e.target.value
        }))
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className={checked ? styles.MainContainer : styles.MainContainerDark}>
            <form className={styles.Form} onSubmit={handleSave}>
                <div className={styles.DivLabel}>
                    <label className={styles.Label}>Nombre: </label>
                    {!editing
                        ?
                        <p className={checked ? styles.Input : styles.InputDark}>{name}</p>
                        :
                        <div className={styles.DivInput}>
                            <input className={checked ? styles.Input : styles.InputDark} onChange={handleChange} value={input.name} name="name" type="text" />
                            {errors.name ? <span className={styles.Errors}>{errors.name}</span> : null}
                        </div>
                    }
                </div>
                <div className={styles.DivLabel}>
                    <label className={styles.Label}>Constraseña: </label>
                    {!editing
                        ?
                        <p className={checked ? styles.Input : styles.InputDark}>*****************</p>
                        :
                        <div className={styles.DivInput}>
                            <input className={checked ? styles.Input : styles.InputDark} onChange={handleChange} value={input.password} name="password" type="text" />
                            {errors.password ? <span className={styles.Errors}>{errors.password}</span> : null}
                        </div>
                    }
                </div>
                <div className={styles.DivLabel}>
                    <label className={styles.Label}>Teléfono: </label>
                    {!editing
                        ?
                        <p className={checked ? styles.Input : styles.InputDark}>{phone}</p>
                        :
                        <div className={styles.DivInput}>
                            <input className={checked ? styles.Input : styles.InputDark} onChange={handleChange} value={input.phone} name="phone" type="number" />
                            {errors.phone ? <span className={styles.Errors}>{errors.phone}</span> : null}
                        </div>
                    }
                </div>
                <div className={styles.DivLabel}>
                    <label className={styles.Label}>Ciudad: </label>
                    {!editing
                        ?
                        <p className={checked ? styles.Input : styles.InputDark}>{city}</p>
                        :
                        <input className={checked ? styles.Input : styles.InputDark} onChange={handleChange} value={input.city} name="city" type="text" />
                    }
                </div>
                {editing
                    ?
                    <div className={styles.ButtonsDiv}>
                        <button className={styles.guardar} disabled={disabled} type="submit">Guardar</button>
                        <button className={checked ? styles.cancelar : styles.cancelarDark} onClick={handleCancel}>Cancelar</button>
                    </div>
                    :
                    null
                }
            </form>
            {editing ? null : <button className={checked ? styles.EditButton : styles.EditButtonDark} onClick={handleEdit}>Editar</button>}

        </div>
    )
}


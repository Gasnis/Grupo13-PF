import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./myBookInfo.module.css"

export default function MyBookInfo (props) {
    const books = props.books;
    const places = useSelector(state=>state.places)
    const [index, setIndex] = useState(0)

    const handlePage = (e) => {
        e.preventDefault();
        switch(e.target.name){
            case "right":
                if (index<books.length-1){
                    setIndex(index+1);
                }else{
                    setIndex(0)
                }
                break;
            case "left":
                if (index>0){
                    setIndex(index-1);
                }else{
                    setIndex(books.length-1)
                }
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <h3>Tienes {books.length} reservas!</h3>
            <div className={styles.CardContainer}>
                <button className={styles.arrows} name="left" onClick={handlePage}>«</button>
                <div className={styles.Card}>
                    <h3>{places.filter(place=>place.id===books[index].localId)[0].name}</h3>
                    <img src={places.filter(place=>place.id===books[index].localId)[0].image} alt="" /><br/>
                    <label>A nombre de: </label><p>{books[index].name}</p>
                    <label>Fecha de reserva:</label><p>{books[index].reservedDate}</p>
                    <label>Reserva para {books[index].personQuantity}</label>
                </div>
                <button className={styles.arrows} name="right" onClick={handlePage}>»</button>
            </div>
        </div>
    )
}
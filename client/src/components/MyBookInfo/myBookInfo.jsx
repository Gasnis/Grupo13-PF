import React, { useState , useEffect} from "react";
import { updatePlace, getPlaces } from "../../redux/actions"
import { useSelector, useDispatch } from "react-redux";
import styles from "./myBookInfo.module.css";
import swal from "sweetalert"


export default function MyBookInfo(props) {
    useEffect(()=>{
        dispatch(getPlaces())
    },[])
  const books = props.books;
  const dispatch = useDispatch()

  const places = useSelector((state) => state.places);
  const checked = useSelector((state) => state.darkmode);
  const [index, setIndex] = useState(0);
  useEffect(()=>{
    dispatch(getPlaces())
  },[dispatch])

  const fechahoy = new Date("02/9/2023");
  const fechareserva = new Date(books[index].reservedDate);
  const expiro = fechahoy.getDate() > fechareserva.getDate();

  console.log(fechahoy);
  console.log(fechareserva);

  const handlePage = (e) => {
    e.preventDefault();
    switch (e.target.name) {
      case "right":
        if (index < books.length - 1) {
          setIndex(index + 1);
        } else {
          setIndex(0);
        }
        break;
      case "left":
        if (index > 0) {
          setIndex(index - 1);
        } else {
          setIndex(books.length - 1);
        }
        break;
      default:
        break;
    }
  };

  const handleRating = async(e) => {

    const localcambia =  places.find((place) => place.id === books[index].localId)
    let newArrRating = localcambia.rating.map((rating, index) => {
      if (e.target.value == index){
        return rating + 1
      }else{
        return rating
      }
    })
    console.log(newArrRating);
    await dispatch(updatePlace({...localcambia, rating: newArrRating}))
    dispatch(getPlaces())
    await console.log(localcambia);
    //swal("Muchas Gracias por darnos tu feedback")
  }

  return (
    <div className={checked ? styles.infoContainer : styles.infoContainerDark}>
      {/* <h3>Tienes {books.length} reservas!</h3> */}
      <div className={styles.CardContainer}>
        <button className={styles.arrows} name="left" onClick={handlePage}>
          «
        </button>
        <div className={checked ? styles.Card : styles.CardDark}>
          <h3>
            {
              places.filter((place) => place.id === books[index].localId)[0]
                .name
            }
          </h3>
          <img
            src={
              places.filter((place) => place.id === books[index].localId)[0]
                .image
            }
            alt=""
            className={styles.localImage}
          />
          <br />
          {expiro ? (
            <div>
              <p>Como fue tu experiencia?</p>
              <div className={styles.estrellas}>
                <button value="0" onClick={handleRating}>1</button>
                <button value="1" onClick={handleRating}>2</button>
                <button value="2" onClick={handleRating}>3</button>
                <button value="3" onClick={handleRating}>4</button>
                <button value="4" onClick={handleRating}>5</button>
              </div>
            </div>
          ) : (
            <div>
              <div> {`A nombre de: ${books[index].name}`} </div>
              <div> {`Fecha de reserva: ${books[index].reservedDate}`}</div>
              <div> {`Hora de reserva: ${books[index].hourDate}`}</div>
              <label>Reserva para {books[index].personQuantity}</label>
            </div>
          )}
        </div>
        <button className={styles.arrows} name="right" onClick={handlePage}>
          »
        </button>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { bookPersist, createBook } from "../../redux/actions";
import { useHistory, useLocation } from "react-router-dom";
import styles from "../FormsStyles/forms.module.css";
import { useEffect } from "react";
import axios from "axios";

function getRestriction(ageRange){
  switch (ageRange){
    case "+18":
      return 18
    case "+21":
      return 21
    case "Sin restricciones":
      return 0
    default:
      break
  }
}

function getNum(date, string) {
  switch (string) {
    case "Month":
      let month = date.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      return month;
    case "Day":
      let day = date.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      return day;
    default:
      return string;
  }
}

function getNextWeek(date){
  let nextWeek = new Date (date.getTime() + 7 * 24 * 60 * 60 * 1000);
  let year = nextWeek.getFullYear();
  let month = nextWeek.getMonth()+1;
  let day = nextWeek.getDate();
  if (month<10) {
    month = `0${month}`
  }
  if (day<10){
    day = `0${day}`
  }
  let maxDateToBook = `${year}-${month}-${day}`
  return maxDateToBook
}


function calculateAge(birthday) {
  var today = new Date();
  var birthDate = new Date(birthday);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}


function validate(input,local,myLocal) {
  let bookingsByDate = local.books.filter(book=>book.reservedDate===input.reservedDate)
  let totalPeopleByDate = bookingsByDate.reduce((total,book)=>total+book.personQuantity,0)
  let errors = {};
  if (!input.reservedDate) errors.reservedDate = "Selecciona una fecha"
  if (!input.name?.length) errors.name = "Debes escribir un nombre"; //puede que el signo ? rompa la validacion
  if (!input.personQuantity?.length)
    errors.personQuantity = "Debes escribir la cantidad de personas"; //puede que el signo ? rompa la validacion
  if (parseInt(input.personQuantity) > 10)
    errors.personQuantity = "Máximo 10 personas";
  if (parseInt(input.personQuantity) < 1)
    errors.personQuantity = "Debes ingresar un número mayor a 1";
  if (!input.userId)
    errors.userId = "Debes loguearte para realizar una reserva";
  if (!myLocal && ((local.capacity-totalPeopleByDate)<=0))
    errors.availability = "El local no tiene disponibilidad para esta fecha";
  if (!input.hourDate) errors.hourDate = "Selecciona la hora de tu reserva";
  return errors;
}

export default function SignUp(props) {
    const location = useLocation()
    const checked = useSelector((state) => state.darkmode);

  const pay = location.search.includes("approved");
  const rejectedPay = location.search.includes("rejected");

  const localId = useSelector((state) => state.placeDetail.id);
  const price = useSelector((state) => state.placeDetail.bookPrice); // 200.5`
  const local = useSelector((state) => state.placeDetail);
  const { profile, book } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const [myLocal, setMyLocal] = useState(profile.id === local.userId)
  
  const date = new Date();
  
  // const [reserved, setReserved] = useState(false) //se cambia cuando se completa la reserva para renderizar un mensaje al usuario antes de ir al home
  const [booking, setBooking] = useState({
    name: book.name,
    reservedDate: book.reservedDate,
    personQuantity: book.personQuantity,
    discountCode: book.discountCode,
    userId: profile.id,
    priceTotal: book.priceTotal,
    hourDate: book.hourDate,
  });
  
  const [errors, setErrors] = useState({
    name: "",
    personQuantity: "",
    age: ""
  });
  
    const age = calculateAge(profile.birthday)
    const ageRestriction = getRestriction(local.ageRange)


    



  //valor que se pasa a la propiedad "disabled" del button
  //solo es "false" cuando no existen errores ni campos vacíos (date)
  const disabled =
    errors.name || errors.personQuantity || !booking.reservedDate || !profile || errors.availability || !myLocal && ageRestriction>age;

  useEffect(() => {
    if (!profile.id) {
      history.push("/login");
    }
    return ()=>{
      setBooking({
        
      })
    }
  }, []);

  function handleChange(event) {
    setErrors(
      validate({
        ...booking,
        [event.target.name]: event.target.value,
      },local,myLocal)
    );
    setBooking({
      ...booking,
      [event.target.name]: event.target.value,
    });
  }


 

  if (pay) {
    const handleSubmit = async (event) => {
     

      const newBooking = await dispatch(
        createBook({
          ...booking,
          localId,
        })
      );
      var data = {
        service_id: 'service_z67u7pr',
        template_id: 'template_l49usqb',
        user_id: 'ZuL0aq8mApf9t1Ax8',
        template_params: {
            name: booking.name,
            reservedDate: booking.reservedDate,
            personQuantity: booking.personQuantity,
            localName: local.name,
            email: booking.userId,
            hourDate: booking.hourDate,

        }
      };
     
      await axios.post('https://api.emailjs.com/api/v1.0/email/send', data)

      if (newBooking.id) {
        setBooking({
          name: "",
          reservedDate: "",
          personQuantity: "",
          discountCode: "",
          hourDate: "",
          //userId?
        });
        // setReserved(true);
        // setTimeout(() => {
        //     history.push('/')
        // }, 2000);
        dispatch(bookPersist({}));
        history.push(`/profile`);
      } else {
        // alert(newBooking.response.data)
      }
    };
    handleSubmit() // recurcion jajaja hace muchos llamados hasta que funciona???
  }

  if (rejectedPay) {
    alert("pago rechazado");
    dispatch(bookPersist({}));
    history.push("/book");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(
      bookPersist({
        ...booking,
        localId,
      })
    );

    const personQuantity = parseInt(booking.personQuantity);
    
    const priceTotal = parseInt(price);
    

    let data = null;
      
    if (!data) {
      data = await axios.post("/payment/generate-link", {
        personQuantity,
        priceTotal, //unit_price
      });
    }

    
    const payUrl = data.data.body.init_point;

    window.location.replace(payUrl);

    // const paylink = await dispatch(getPaylink())
  };

  const goBack = (e) => {
    history.goBack();
  };

    return (
        <>
            <Navbar />
            <div className={checked ? styles.container : styles.containerDark}>
                <div className={checked ? styles.formContainer : styles.formContainerDark}>
                    <h1 className={checked ? styles.title : styles.titleDark}>Hace tu reserva</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input className={checked ? styles.input : styles.inputDark}
                                type='text'
                                placeholder='Nombre'
                                value={booking.name}
                                name="name"
                                onChange={handleChange}
                            />
                            {!errors.availability && errors.name ? <span>{errors.name}</span> : null}
                        </div>

                        <div>
                            <input className={checked ? styles.input : styles.inputDark}
                                type='date'
                                min={`${date.getFullYear()}-${getNum(date, "Month")}-${getNum(date, "Day")}`}
                                max={getNextWeek(date)}
                                placeholder='Mail'
                                value={booking.reservedDate}
                                name="reservedDate"
                                onChange={handleChange}
                            />
                            {!errors.availability && errors.reservedDate ? <span>{errors.reservedDate}</span> : null}
                        </div>

                        <div>
                            <input className={checked ? styles.input : styles.inputDark}
                                type='number'
                                min="1"
                                max="10"
                                placeholder='Cantidad de personas'
                                value={booking.personQuantity}
                                name="personQuantity"
                                onChange={handleChange}
                            />
                            {!errors.availability && errors.personQuantity ? <span>{errors.personQuantity}</span> : null}
                        </div>

                        <div>
                            <select className={checked ? styles.input : styles.inputDark}
                                value={booking.hourDate}
                                name="hourDate"
                                onChange={handleChange}>
                                  <option value="" hidden>Horario</option> 
                                  <option value="18:00">18:00</option>                                    
                                  <option value="19:00">19:00</option>
                                  <option value="20:00">20:00</option>
                                  <option value="21:00">21:00</option>
                                  <option value="22:00">22:00</option>
                                  <option value="23:00">23:00</option>

                            </select>
                            {!errors.availability && errors.hourDate ? <span>{errors.hourDate}</span> : null}
                        </div>

                        <div>
                            <input className={checked ? styles.input : styles.inputDark}
                                type='text'
                                placeholder='discountCode'
                                value={booking.discountCode}
                                name="discountCode"
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.linksContainer}>
                            <button disabled={disabled} type="submit" id="signUpButton" className={checked ? styles.submitButton : styles.submitButtonDark}>Reservar</button>
                            {localId ? <button className={styles.volverButton} onClick={goBack}>Volver</button> : null}
                        </div>
                    </form>
                    {!myLocal && ageRestriction>age ? <span>No tienes la edad mínima para reservar en este local</span> : null}
                    {errors.availability ? <span>{errors.availability}</span> : null}

          {/* {reserved ? <h3 className={styles.title}>Successful booking</h3> : null} */}
        </div>
      </div>
    </>
  );
}



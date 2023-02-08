import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import style from "./card.module.css";


export default function Place({ place }) {
  const [state, setState] = useState(0)

const handleNextAndBack = (event) =>{
  event.preventDefault()
  if(event.target.name === 'next'){
      if(state + 1 >= place.image.length){
          return
      }else{
          setState(state+1)
      }
  }
  if(event.target.name === "back" ){
      if(state === 0){
          return
      }else{
          setState(state - 1)
      }
  }
}
const slideRef = useRef(null);
const startX = 0
const moveX = 0

const handleTouchStart = event => {
  startX = event.touches[0].clientX;
};

const handleTouchMove = event => {
  moveX = event.touches[0].clientX;
};

const handleTouchEnd = event => {
  const translateX = moveX - startX;
  if (translateX > 50) {
    // swipe right
    setState(state - 1)
  } else if (translateX < -50) {
    // swipe left
    setState(state+1)
  }
  slideRef.current.style.transition = 'transform 0.3s ease-in-out';
  slideRef.current.style.transform = `translateX(-${setState * 100}%)`;
};

  return (
    <div className={style.places}>
      {place.available ? (
          <Link className={style.place} to={`/detail/${place.id}`} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            {/* <img src={place.image[0]} className={style.logo} alt="img" /> */}
            <div className={style.img}>
                    {state === 0?null:  <button name="back"  onClick={handleNextAndBack} className={style.backBotton}>{'<'}</button>}

                    {state + 1 >= place.image.length? null: <button name="next" onClick={handleNextAndBack}   className={style.nextBotton}>{'>'}</button> }
                  <div>

                    <img className={style.img} src={place.image[state]} alt="" />
                  </div>
                </div>
            <div className={style.textContainer}>
              <div className={style.text}>
                <h3>{place.name}</h3>
                <h4>{place.category}</h4>
              </div>
              <div className={style.numbersInfo}>
                <h4>
                  {place.rating}
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Ic%C3%B4ne_%C3%A9toile_d%27or_%C3%A0_cinq_branches.svg/200px-Ic%C3%B4ne_%C3%A9toile_d%27or_%C3%A0_cinq_branches.svg.png"
                    height="20px"
                    width="20px"
                  />
                </h4>
                <h4>Edad {place.ageRange}</h4>
              </div>
            </div>
          </Link>
        
      ) : (
        
          <div className={style.placedisabled}>
            <img src={place.image[0]} className={style.logodisabled} alt="img" />
            <div className={style.textContainer}>
              <div className={style.text}>
                <h3>{place.name}</h3>
                <h4>{place.category}</h4>
              </div>
              <div className={style.numbersInfo}>
                <h4>
                  {place.rating}
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Ic%C3%B4ne_%C3%A9toile_d%27or_%C3%A0_cinq_branches.svg/200px-Ic%C3%B4ne_%C3%A9toile_d%27or_%C3%A0_cinq_branches.svg.png"
                    height="20px"
                    width="20px"
                  />
                </h4>
                <h4>Edad {place.ageRange}</h4>
              </div>
            </div>
          </div>
        
      )}
    </div>
  );
}

import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCategory, getPlaces } from "../../redux/actions"


export default function Filter() {
      const dispatch = useDispatch();
      const [order, setOrder] = useState("");
      
      useEffect(() => {
        dispatch(getPlaces()); 
      }, [dispatch]);
      
      function handleFilteredType(e) {
        e.preventDefault();
        dispatch(filterCategory(e.target.value));
      }
      
      

        return (

              <div>


                <select
                  onChange={(e) => handleFilteredType(e)}
                >
                  <option value="all">All</option>
                  <option value="pub">Pubs</option>
                  <option value="disco">Discotecas</option>
                  <option value="bar">Bares</option>
                </select>          
              </div>
        );
      }


import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCategory, filterOrder, getPlaces } from "../../redux/actions"


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
      
      
      function handleFilteredOrder(e) {
        e.preventDefault();
        dispatch(filterOrder(e.target.value));
        setOrder(`Ordered ${e.target.value}`);
        }
      

        return (

              <div>
                <select
                  onChange={(e) => handleFilteredOrder(e)}
                >
                  <option value="asc">A-Z</option>
                  <option value="dec">Z-A</option>
                </select>

                <select
                  onChange={(e) => handleFilteredType(e)}
                >
                  <option value="all">All</option>
                  <option value="pub">PUBs</option>
                  <option value="disco">Discotecas</option>
                  <option value="bar">Bares</option>
                </select>          
              </div>
        );
      }


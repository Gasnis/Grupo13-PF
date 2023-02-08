const axios = require("axios");
const {City} = require("../../db");


const getAllCities = async () => {
    let property = "localidades-censales"
    let response = await axios("https://infra.datos.gob.ar/catalog/modernizacion/dataset/7/distribution/7.27/download/localidades-censales.json") 
    response.data[property].map(async (city)=>{
        let newCity = await City.create({
            id: city.id,
            name: city.nombre
        })
        newCity.setState(city.provincia.id)
    })
}

module.exports={getAllCities}
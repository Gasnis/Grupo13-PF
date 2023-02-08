const axios = require("axios");
const {State} = require("../../db")

const getStates = async () => {
    let response = await axios("https://infra.datos.gob.ar/catalog/modernizacion/dataset/7/distribution/7.2/download/provincias.json")
    response.data.provincias.map(async (provincia)=>{
        await State.create({
            id:provincia.id,
            name:provincia.nombre
        })
    })
}

module.exports = {getStates}
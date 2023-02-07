const {Router} = require("express");
const { getAllCities } = require("../../controllers/cityController/cityController");
const {City, State} = require("../../db");

const router = Router();

router.get("/:stateName", async (req,res) => {
    try {
        let {stateName} = req.params;
        let cities = await City.findAll();
        if (!cities.length){
           cities = await getAllCities();
        }
        let {id} = await State.findOne({
            where:{name:stateName}
        })
        cities = await City.findAll({
            where:{stateId:id}
        })
        res.json(cities)
    } catch (error) {

    }
})


module.exports = router
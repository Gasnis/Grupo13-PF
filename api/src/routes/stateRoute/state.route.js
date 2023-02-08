const {Router} = require("express")
const {State} = require("../../db")
const {getStates} = require("../../controllers/stateController/stateController")

const router = Router();

router.get("/", async (req,res)=>{
    let states = await State.findAll();
    if (!states.length){
        await getStates();
    }
    res.json(states)
})

module.exports = router
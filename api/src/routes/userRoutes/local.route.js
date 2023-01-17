const {Router} = require("express")
const postLocalData = require("../../controllers/localControllers/local.controller")


const router = Router()

router.post("/", async(req, res)=>{
    try {
        const localData = req.body;
        const localDataCreated = await postLocalData(localData)
        res.status(200).json(localDataCreated)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;
const {Router} = require("express")
const {postUserData, getUserDetail} = require("../../controllers/userControllers/user.controller")


const router = Router()

router.post("/", async(req, res)=>{
    try {
        const userData = req.body;
        const userDataCreated = await postUserData(userData)
        res.status(200).json(userDataCreated)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get("/:id", async (req,res) => {
    try {
        const { id } = req.params
        const getDetail = await getUserDetail(id)
        res.status(200).json(getDetail)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = router;
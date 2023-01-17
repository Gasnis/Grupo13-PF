const {Router} = require("express")
const { Local, User, Book } = require("../../db");
const {postLocalData,getLocalDetail} = require("../../controllers/localControllers/local.controller")


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

router.get("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      if (id) {
        const localById = await getLocalDetail(id)
        return res.status(200).send(localById);
      }
    } catch (error) {
      return res.status(400).send("Local could not load properly");
    }
  });
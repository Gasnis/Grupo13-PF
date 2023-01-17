const {Router} = require("express")
const { Local, User, Book } = require("../../db");
const {postLocalData,getLocalDetail} = require("../../controllers/localControllers/local.controller")


const router = Router()



router.get("/", async (req, res)=>{
  
  const {name} = req.query;
  const localInfo = Local.findAll({
    include: [Local],
})
  if(name){
    const byName = localInfo.filter(local => local.name.toLowerCase().includes(name.toLowerCase()));

    byName.length?
    res.status(200).json(byName): 
    res.status(404).json({msg: "Local not found :/"})
  }else{
    res.status(200).json(localInfo)
  }
})

router.post("/", async(req, res)=>{
    try {
        const localData = req.body;
        const localDataCreated = await postLocalData(localData)
        res.status(200).json(localDataCreated)
    } catch (error) {
        res.status(400).send(error.message)
    }
})


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




  module.exports = router;
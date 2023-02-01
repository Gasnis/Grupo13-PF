const {Router} = require("express")
const { Local, User, Book } = require("../../db");

const {postLocalData, getLocalName, getLocalDetail, deleteLocal, updateLocal} = require("../../controllers/localControllers/local.controller")



const router = Router()


router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const localName = await getLocalName(name);
      res.status(200).json(localName);
    }else{
      res.status(200).json(await getLocalName());
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});


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
      return res.status(400).send(error.message);
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
    const {id} = req.params;
      if (id) {
        console.log("entré al if");
        deleteLocal(id)
        res.status(200).send(`${id} was deleted succesfully`);
      } else {
        console.log(id+"   else");
        res.status(404).send("ID not found");
      }
    } catch (error) {
      console.log("catch");
      res.status(400).send(error.message);
    }
  });


  router.put("/", async (req, res) => {
    try {
      const {id,name,category,image,location,schedule,menu,event,capacity,petFriendly,ageRange,phone,promo,bookPrice,available,rating,status,city} = req.body
      if (id && name && category && image && location && schedule && menu && capacity && ageRange && phone && bookPrice && rating && city ) {
        const updated = await updateLocal(id,name,category,image,location,schedule,menu,event,capacity,petFriendly,ageRange,phone,promo,bookPrice,available,rating,status,city)

        
         res.status(200).send(updated);
    } else {
      res.status(404).send("Not all parameters arrived successfully");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});



  module.exports = router;
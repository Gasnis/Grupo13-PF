const {Router} = require("express")
const {postUserData,getUserDetail,getAllUsers,updateUser,deleteUser} = require("../../controllers/userControllers/user.controller")


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

router.get("/", async (req,res) => {
  try {
    const { name } = req.query;
    if (name) {
      const localName = await getAllUsers(name);
      res.status(200).json(localName);
    }else{
      res.status(200).json(await getAllUsers());
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});


router.get("/:id", async (req,res) => {
    try {
        const { id } = req.params
        const getDetail = await getUserDetail(id)
        res.status(200).json(getDetail)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.delete("/", async (req, res) => {
    try {
    const { id } = req.body;
      if (id) {
        deleteUser(id)
        res.status(200).send(`${id} was deleted succesfully`);
      } else {
        res.status(404).send("ID not found");
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  
router.put("/", async (req, res) => {
    try {
      const newUserData = req.body
      const updated = await updateUser(newUserData)
      res.status(200).send(updated);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


  
module.exports = router;
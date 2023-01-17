const {Router} = require("express")
const { Local, User, Book } = require("../../db");
const {postLocalData, getLocalName} = require("../../controllers/localControllers/local.controller")


const router = Router()


router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const localName = getLocalName(name);
      res.status(200).json(localName);
    }

    res.status(200).json(getLocalName());
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
      const local = await Local.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
          }
        });
        const localById = local.filter((l) =>
          l.id.includes(id)
        );
        if (localById.length === 0) {
          {
            return res.status(404).send("Local not found");
          }
        }
        return res.status(200).send(localById);
      }
    } catch (error) {
      return res.status(400).send("Local could not load properly");
    }
  });




  module.exports = router;
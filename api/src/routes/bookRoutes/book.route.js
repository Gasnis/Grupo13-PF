const {Router} =require("express")
const {postBookData,getBookDetail} =require("../../controllers/bookController/book.controller")

const router = Router()


router.post("/", async (req, res) => {
    try {
      const bookData = req.body;

      
        const bookDataCreated = await postBookData(bookData);
        res.status(200).json(bookDataCreated);
      
    } catch (error) {
      res.status(404).send(error.message);
    }
  });

  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    
  
      try {
        if (id) {
          const bookById = await getBookDetail(id)
          return res.status(200).send(bookById);
        }
      } catch (error) {
        return res.status(400).send(error.message);
      }
    });



  module.exports = router;
const {Router} =require("express")
const {postBookData} =require("../../controllers/bookController/book.controller")

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



  module.exports = router;
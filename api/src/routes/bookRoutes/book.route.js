const {Router} =require("express")
const {postBookData,getBookDetail, deleteBook} =require("../../controllers/bookController/book.controller")

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

    router.put("/", async (req, res) => {
      try {
        const {id,name,reservedDate,createdAt,updatedAt,personQuantity,codeProm} = req.body
        if (id && name && reservedDate && createdAt && updatedAt && personQuantity && codeProm){
           const updated = await updateBook(id,name,reservedDate,createdAt,updatedAt,personQuantity,codeProm)
  
           res.status(200).send(updated);
      } else {
        res.status(404).send("Not all parameters arrived successfully");
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
    router.delete("/", async (req, res) => {
        try {
            const { id } = req.body;
            deleteBook(id)
            res.status(200).send(`${id} was deleted succesfully`);
          
        } catch (error) {
          res.status(400).send(error.message);
        }
      });



  module.exports = router;
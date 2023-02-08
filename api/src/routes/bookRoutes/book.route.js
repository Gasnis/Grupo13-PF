const {Router} =require("express")
const {postBookData,getBookDetail, deleteBook,getAllBooks} =require("../../controllers/bookController/book.controller")

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


    router.get("/", async (req,res) => {
      try {
          const allBoks = await getAllBooks()
          res.status(200).json(allBoks)
      } catch (error) {
          res.status(404).send(error.message)
      }
  })
  

    router.put("/", async (req, res) => {
      try {
        const {id,name,reservedDate,createdAt,updatedAt,personQuantity,codeProm, hourDate} = req.body
        if (id && name && reservedDate && createdAt && updatedAt && personQuantity && codeProm && hourDate) {
           const updated = await updateBook(id,name,reservedDate,createdAt,updatedAt,personQuantity,codeProm, hourDate)
  
           res.status(200).send(updated);
      } else {
        res.status(404).send("Not all parameters arrived successfully");
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
    router.delete("/:id", async (req, res) => {
        try {
            const { id } = req.params;
            if (id) {
              deleteBook(id)
              res.status(200).send(`${id} was deleted succesfully`);
          } else {
            res.status(404).send("ID not found");
          }
        } catch (error) {
          res.status(400).send(error.message);
        }
      });

      //collection_id=1311408084&collection_status=approved&payment_id=1311408084&status=approved&external_reference=null&payment_type=credit_card&merchant_order_id=7456488748&preference_id=1295777517-246a8fe2-198b-4d50-962f-3ac4e7327c60&site_id=MLC&processing_mode=aggregator&merchant_account_id=null

      router.post("/redirect", (req, res) => {
        const collectionId = req.query.collection_id;
        const collectionStatus = req.query.collection_status;
      })



  module.exports = router;
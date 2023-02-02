const {Router} = require('express');
const {Local} = require("../../db")
const {uploadImage} = require("../../controllers/cloudinaryController/cloudinary.controller")

const router = Router();

router.get('/', async (req, res) => {
    // console.log(req.body)
    // const {id} = req.body;
    // const {path}= req.body;
  
    // try {
    //   const result = await uploadImage(path);
      
    //   const imageUrl = result.secure_url;
  
    //   // Buscar el bar específico y actualizar la URL de la imagen
    //   const local = await Local.findByIdAndUpdate(id, { image: imageUrl });
      
    //   /* Sending the local object to the client. */
    //   res.send({ local });
    // } catch (error) {
    //     console.error(error)
    //   res.status(500).send({ error: 'Error uploading image' });
    // }

    console.log("hola")
  });
  
  module.exports = router;
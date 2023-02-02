const {Router} = require('express');
const {Local} = require("../../db")
const {uploadImage} = require("../../controllers/cloudinaryController/cloudinary.controller")

const router = Router();

router.post('/', async (req, res) => {
   
    const id = req.body.id;
    const path= req.body.path;
  
    try {
      const result = await uploadImage(path);
      
      const imageUrl = result.secure_url;
  
      // Buscar el bar específico y actualizar la URL de la imagen
      const local = await Local.findByIdAndUpdate(id, { image: imageUrl });
      
      /* Sending the local object to the client. */
      res.send({ local });
    } catch (error) {
        console.error(error)
      res.status(500).send({ error: 'Error uploading image' });
    }

    
  });
  
  module.exports = router;
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'thomrojas',
  api_key: '232579986321396',
  api_secret: 'C5YGxvMRDa51oZf-W337GI37PMM'
});


const uploadImage = async (path) => {
    return await cloudinary.uploader.upload(path, { resource_type: 'image' });
  };


  module.exports = {
    uploadImage,
  }
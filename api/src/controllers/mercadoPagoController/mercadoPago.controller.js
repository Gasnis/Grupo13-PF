const mercadopago = require("mercadopago");
require("dotenv").config();
const { MP_KEY } = process.env
// ********************************** ORDEN DE PAGO **************************************************
const generateLink = async (req, res) => {
  const data = req.body
  const { personQuantity, priceTotal, id } = req.body;

  mercadopago.configure({
    access_token: MP_KEY,
  });

  let preferences = {
    items: [
      {
        title: "Reserva/promoción",
        quantity: personQuantity, //1
        currency_id: "ARS", // opesos arg
        unit_price: priceTotal, //precio de venta * quantity
      },
      
    ],
    back_urls: {
      success: "https://wwwhere.up.railway.app/book",
      failure: "https://wwwhere.up.railway.app/book",
      pending: "https://wwwhere.up.railway.app/book",
    },
    auto_return: "approved",
    payment_methods: {
      installments: 1,
    },
  };

  let response1 = {}

  mercadopago.preferences
    .create(preferences)
    .then((response) => {
      response1 = response;
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
    });

  
    


    mercadopago.payment.search({
      preference_id: response1.id
    })
    .then(function(data){
      console.log(data)
    })
    .catch(function(error){
      console.log(error)
    })
};

module.exports = {
  generateLink,
};

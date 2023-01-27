const mercadopago = require("mercadopago");
require("dotenv").config();
const { MP_KEY } = process.env;
// ********************************** ORDEN DE PAGO **************************************************
const generateLink = async (req, res) => {
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
      {
        title: "Premium Local",
        quantity: personQuantity,
        currency_id: "ARS",
        unit_price: priceTotal,
      },
    ],
    back_urls: {
      success: "192.168.1.85:3001/book",
      failure: "http://localhost:3001/book",
      pending: "http://localhost:3001/book",
    },
    auto_return: "approved",
    payment_methods: {
      installments: 1,
    },
  };

  mercadopago.preferences
    .create(preferences)
    .then((response) => {
      res.json(response.body.init_point);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  generateLink,
};

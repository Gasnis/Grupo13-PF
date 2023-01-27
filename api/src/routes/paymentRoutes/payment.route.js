const { Router } = require("express");
const {
    generateLink,
} = require("../../controllers/mercadoPagoController/mercadoPago.controller");
const {
  createBookingTicket,
} = require("../../controllers/paymentController/payment.controller");

const {getBookDetail} = require("../../controllers/bookController/book.controller")

const router = Router();

router.post("/generate-link", generateLink);
router.get("/get-order", getBookDetail);// lo recibirá siempre y cuando el pago exitoso


module.exports = router;

const { Router } = require('express');
const userRouter = require("./userRoutes/user.route")
const localRouter = require("./localRoutes/local.route")
const bookRouter = require("./bookRoutes/book.route")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use('/user', userRouter) // llega la promesa y va a bucar la rura de la variable userRouter
router.use('/local', localRouter)
router.use('/book', bookRouter)

module.exports = router;

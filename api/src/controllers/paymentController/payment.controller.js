const { Book, User } = require("../../db");

const createBookingTicket = async (req, res) => {
    
  try {
    const { priceTotal, personQuantity, date, name, id } = req.body;
    const newBookTicket = await Book.create({
      id: id,
      priceTotal: priceTotal,
      personQuantity: personQuantity,
      date: date,
      name: name,
      
    });
    

    const bookingTicketDb = await Book.findall({
      where: { name: name },
    });

    const userDB = await User.findAll({
      where: { name: name },
    });

    newBookTicket.addEvent(bookingTicketDb);
    newBookTicket.addUser(userDB);

    res.status(201).json({
      msg: "You have allready checked with ticket! Congratz! ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      msg: "You must talk with a administrator",
    });
  }

};



module.exports =  {createBookingTicket,};

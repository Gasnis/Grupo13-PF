const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('local', {
    id: {
      type: DataTypes.UUID, // email
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true,
      allowNull: false,
    },
<<<<<<< HEAD
    flag: {
=======
    // password: {
    //   type: Datatypes.STRING,
    //   allowNull:false,
    // },
    name: {
>>>>>>> main
      type: DataTypes.STRING,
      allowNull: false,
    },
<<<<<<< HEAD
=======
    category: {
      type: DataTypes.ENUM,
      values: ["disco", "pub", "bar"],
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,// string 255 / text unlimited
      allowNull: true, 
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true, // **
    },
    menu: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    event: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    capacity: {
      type: DataTypes.INTEGER,/* A data type. */
      allowNull: false,
    },
    petFriendly: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    ageRange: {
        type: DataTypes.ARRAY(DataTypes.INTEGER), // Para colocar "18+" "18  - 40" "18++"
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING, //"+4542545875423"
      allowNull: true,
    },
    promo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bookPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    rating: {
        type: DataTypes.INTEGER, //  || integer
      },
>>>>>>> main
  });
};

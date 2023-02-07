const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('local', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true,
      allowNull: false,
    },

    // password: {
    //   type: Datatypes.STRING,
    //   allowNull:false,
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.ENUM,
      values: ["disco", "pub", "bar"],
      allowNull: true,
    },
    image: {
      type: DataTypes.ARRAY(DataTypes.TEXT),// string 255 / text unlimited
      allowNull: true, 
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true, // **
    },
    schedule: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true, // **
    },
    menu: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
    event: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    capacity: {
      type: DataTypes.INTEGER,/* A data type. */
      allowNull: true,
    },
    petFriendly: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    ageRange: {
        type: DataTypes.STRING, // Para colocar "18+" "18  - 40" "18++"
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
      type: DataTypes.STRING,
      allowNull: true,
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    status: {
      type: DataTypes.ENUM("solicitud", "aprobado"),
      defaultValue: "solicitud",
    },
    rating: {
        type: DataTypes.ARRAY(DataTypes.INTEGER), //  || integer
        defaultValue:[1,1,1,1,1],
      },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
};

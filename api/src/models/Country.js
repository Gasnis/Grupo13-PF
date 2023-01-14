const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id:{
      type: DataTypes.NUMBER,

    },
    name: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    flag: {
      type: DataTypes.STRING,
    },
    population: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  });
};

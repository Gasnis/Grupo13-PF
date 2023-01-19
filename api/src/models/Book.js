const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('book', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    reservedDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    personQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    codeProm: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  });

};
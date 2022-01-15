const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('center', {
id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
},

name: {
    type: DataTypes.STRING,
    allowNull: false,
},

category: {
    type: DataTypes.STRING,
    allowNull: false,
},

address: {
    type: DataTypes.STRING,
    allowNull:false,
},

description: {
    type: DataTypes.STRING,
    allowNull: false,
},

image: {
    type: DataTypes.STRING,
    allowNull: true,
},

city: {
    type: DataTypes.STRING,
    allowNull:false,
},


  },
{
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
},

);
};
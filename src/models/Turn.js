const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('turn', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
  },

  description: {
  type: DataTypes.STRING,
},

    date: {
      type: DataTypes.DATE,
      allowNull: false,
  },

  createdInDb:{
    type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
  },
},

{
      freezeTableName: true,
      timestamps: false,
      createdAt: false,
      
},
  
);
};
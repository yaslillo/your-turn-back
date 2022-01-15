const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('service', {
        id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING,
        },

        price: {
            type: DataTypes.INTEGER,
        },

        image: {
            type: DataTypes.TEXT,
            
        },

        description: {
            type: DataTypes.STRING(500),
        },

        available: {
            type: DataTypes.BOOLEAN,
            defaultValue:true
        },

},{
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    });
};
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define(
        'admin',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },

            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            accessToken: {
                type: DataTypes.STRING,
            },

            publickey: {
                type: DataTypes.STRING,
            },

            active:{
                type: DataTypes.BOOLEAN,
            defaultValue:true 
            }
        },
        {
            freezeTableName: true,
            timestamps: false,
            createdAt: false,
        }
    );
};
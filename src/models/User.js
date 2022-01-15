const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define(
        'user',
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

            address: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            phone: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: true,
            },

            dni: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },

            password: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },

            publickey: {
                type: DataTypes.STRING,
            },

            rol: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },

            states: {
                type: DataTypes.ENUM,
                values: ['active', 'pending', 'deleted'],
            },
            
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
            createdAt: false,
        }
    );
};
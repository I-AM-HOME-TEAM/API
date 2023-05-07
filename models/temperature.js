const {DataTypes} = require('sequelize');
const sequelize = require('../database');
const Device = require('./device');

const Temperature = sequelize.define('Temperature', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    device_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'devices',
            key: 'id',
        }
    },
    temperature: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    timestamps: true,
    underscored: true,
    tableName: 'temperatures',
});

Temperature.associate = function(models) {
    Temperature.belongsTo(models.Device, { foreignKey: 'device_id', onDelete: 'CASCADE' });
};

module.exports = Temperature;
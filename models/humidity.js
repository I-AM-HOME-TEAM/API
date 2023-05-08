const {DataTypes} = require('sequelize');
const sequelize = require('../database');
const Device = require('./device');

const Humidity = sequelize.define('Humidity', {
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
    humidity: {
        type: DataTypes.INTEGER,
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
    tableName: 'humidities',
});

Humidity.associate = function(models) {
    Humidity.belongsTo(models.Device, { foreignKey: 'device_id', onDelete: 'CASCADE' });
};

module.exports = Humidity;
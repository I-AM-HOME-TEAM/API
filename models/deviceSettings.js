const {DataTypes} = require('sequelize');
const sequelize = require('../database');
const User = require('./user');
const Device = require('./device');

const DeviceSettings = sequelize.define('DeviceSettings', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        }
    },
    device_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'devices',
            key: 'id'
        }
    },
    delay: {
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
    tableName: 'device_settings',
});

DeviceSettings.associate = function(models) {
    DeviceSettings.belongsTo(models.User, {foreignKey: 'user_id', onDelete: 'CASCADE'});
    DeviceSettings.belongsTo(models.Device, {foreignKey: 'device_id', onDelete: 'CASCADE' });
};

module.exports = DeviceSettings;
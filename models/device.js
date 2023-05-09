const {DataTypes} = require('sequelize');
const sequelize = require('../database');
const User = require('./user');
const DeviceSettings = require('./deviceSettings');
const Temperature = require('./temperature');
const Humidity = require('./humidity');

const Device = sequelize.define('Device', {
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
            key: 'id'
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('1', '2'),
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
    tableName: 'devices',
});

Device.associate = function(models) {
    Device.belongsTo(models.User, {foreignKey: 'user_id', onDelete: 'CASCADE'});
    Device.hasMany(models.DeviceSettings, {foreignKey: 'device_id', onDelete: 'CASCADE'});
    Device.hasMany(models.Temperature, { foreignKey: 'device_id', onDelete: 'CASCADE' });
    Device.hasMany(models.Humidity, { foreignKey: 'device_id', onDelete: 'CASCADE' });
};

module.exports = Device;
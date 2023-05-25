const {DataTypes} = require('sequelize');
const sequelize = require('../database');
const UserSettings = require('./userSettings');
const Roles = require('./roles');
const Notifications = require('./notifications');
const DeviceSettings = require('./deviceSettings');
const IpAddresses = require('./ipAddresses');
const Device = require('./device');

const User = sequelize.define('User', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            role_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'roles',
                    key: 'id',
                }
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            restoration_token: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            verification_token: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            is_verified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            }
        }, {
            timestamps: true,
            underscored: true,
            tableName: 'users',
        }
    );

User.associate = function(models) {
    User.hasOne(models.UserSettings, { foreignKey: 'user_id',  onDelete: 'CASCADE'});
    User.hasMany(models.Notifications, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    User.hasMany(models.DeviceSettings, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    User.belongsTo(models.Roles, { foreignKey: 'role_id', onDelete: 'CASCADE' });
    User.hasMany(models.IpAddresses, { foreignKey: 'user_id', onDelete: 'CASCADE' });
};

module.exports = User;
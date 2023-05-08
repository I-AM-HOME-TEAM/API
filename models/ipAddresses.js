const {DataTypes} = require('sequelize');
const sequelize = require('../database');
const User = require('./user');

const IpAddresses = sequelize.define('IpAddresses', {
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
    ip: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_agent: {
      type: DataTypes.STRING,
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
    tableName: 'ip_addresses',
});

IpAddresses.associate = function(models) {
    IpAddresses.belongsTo(models.User, {foreignKey: 'user_id', onDelete: 'CASCADE'});
};

module.exports = IpAddresses;
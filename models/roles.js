const {DataTypes} = require('sequelize');
const sequelize = require('../database');
const User = require('./user');

const Roles = sequelize.define('Roles', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    }, {
        timestamps: true,
        underscored: true,
        tableName: 'roles',
    });

Roles.associate = function(models) {
    Roles.hasMany(models.User, { foreignKey: 'role_id', onDelete: 'CASCADE' });
};

module.exports = Roles;
const {DataTypes} = require('sequelize');
const sequelize = require('../database');
const User = require('./user');

const UserSettings = sequelize.define('UserSettings', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        }
    },
    theme: {
        type: DataTypes.BOOLEAN,
        allowNull: false
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
    tableName: 'user_settings',
    },
);

UserSettings.associate = function(models) {
    UserSettings.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
};

module.exports = UserSettings;
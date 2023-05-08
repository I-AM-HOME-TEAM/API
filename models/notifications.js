const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user');
const OpenAiLogs = require('./openAiLogs');

const Notifications = sequelize.define('Notifications', {
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
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    open_ai_log_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'open_ai_logs',
            key: 'id',
        }
    },
    type: {
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
    tableName: 'notifications',
});

Notifications.associate = function (models) {
    Notifications.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    Notifications.belongsTo(models.OpenAiLogs, { foreignKey: 'open_ai_log_id' });
};

module.exports = Notifications;
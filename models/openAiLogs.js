const {DataTypes, Op} = require('sequelize');
const sequelize = require('../database');
const Notifications = require('./notifications');

const OpenAiLogs = sequelize.define('OpenAiLogs', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    request: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    response: {
        type: DataTypes.TEXT,
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
    tableName: 'open_ai_logs',
});

OpenAiLogs.associate = function (models) {
    OpenAiLogs.hasOne(models.Notifications, { foreignKey: 'open_ai_log_id', onDelete: 'CASCADE' });
};

module.exports = OpenAiLogs;
const db = require('../models')
const Notification = db.notifications;

// Create notification
const addNotification = async (req, res) => {

    let info = {
        user_id: req.body.user_id,
        message: req.body.message,
        open_ai_log_id: req.body.open_ai_log_id,
        type: req.body.type
    }

    const notification = await Notification.create(info);

    res.status(200).send(notification);

    console.log(notification);
}

// Get all notifications from table
const getAllNotifications = async (req, res) => {

    let notification = await Notification.findAll({  }); // can add attributes

    res.status(200).send(notification);

}

// Get one notification from table by id
const getOneNotification = async (req, res) => {

    let id = req.params.id;

    let notification = await Notification.findOne({ where: { id: id }});

    res.status(200).send(notification);

}

// Update notification by id
const updateNotification = async (req, res) => {

    let id = req.params.id;

    const notification = await Notification.update(req.body, { where: { id: id }});

    res.status(200).send('Notification updated successfully!');
}

// Delete notification by id
const deleteNotification = async (req, res) => {

    let id = req.params.id;

    await Notification.destroy({ where: { id: id } });

    res.status(200).send('Notification is deleted!');

}

module.exports = {
    addNotification,
    getAllNotifications,
    getOneNotification,
    deleteNotification,
    updateNotification
}

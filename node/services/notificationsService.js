// services/notificationsService.js

const con = require('../database');
const socket = require('../socket');

exports.getAllNotifications = async () => {
    try {
        const notifications = await con.query("SELECT * FROM notifications");
        return notifications;
    } catch (error) {
        throw error;
    }
};


// Send notification
exports.sendNotification = async (user_id,title, notification_text) => {
    try {
        // Save notification to the database with is_read set to false
        const result = await con.query("INSERT INTO notifications (user_id, notification_text, notification_date, is_read) VALUES (?, ?, ?, ?)", [user_id, notification_text, new Date(), false]);

        // Emit the notification to the WebSocket server
        socket.emit('notification', { id: result.insertId, user_id, title: title, notification_text, notification_date: new Date(), is_read: false });

        return { id: result.insertId, user_id, title: title, notification_text, notification_date: new Date(), is_read: false };
    } catch (error) {
        throw error;
    }
};

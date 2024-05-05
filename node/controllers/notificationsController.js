const con = require('../database');

const notificationsService = require('../services/notificationsService');

exports.getAllNotifications = async (req, res) => {
    try {
        con.query("SELECT * FROM notifications",
        (err, result) => {
            if (err) {
                console.error('Error getting notification in:', err);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                    res.status(200).json(result);
            }
        })
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

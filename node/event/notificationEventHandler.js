// eventHandlers/notificationEventHandler.js

const sendNotification = require('../services/notificationsService').sendNotification;

// Example event handler for sending notifications
exports.handleNotificationEvent = (eventType, eventData) => {
    switch (eventType) {
        case 'user_created':
            sendNotification(eventData.userId, 'New user created', `A new user with ID ${eventData.userId} has been created.`);
            break;
        case 'financial_change':
            sendNotification(eventData.userId, 'Financial change', `Financial changes have occurred.`);
            break;
        case 'user_login':
            sendNotification(eventData.userId, 'Login Alert', `You logged in at ${eventData.loginTime}.`);
            break;
        default:
            break;
    }
};

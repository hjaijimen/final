const regulatoryUpdateService = require('../services/regulatoryUpdateService');
const con = require('../database');

// Add regulatory update
exports.addRegulatoryUpdate = async (req, res) => {
    try {
        const { update_text } = req.body;
        const newUpdate = await regulatoryUpdateService.addRegulatoryUpdate(update_text);
        res.status(201).json(newUpdate);
    } catch (error) {
        console.error('Error adding regulatory update:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all regulatory updates
exports.getAllRegulatoryUpdates = (req, res) => {
    try {
        con.query("SELECT * FROM regulatory_updates",
        (err, result) => {
            if (err) {
                console.error('Error getting refulatory updates in:', err);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                    res.status(200).json(result);
            }
        })
    } catch (error) {
        console.error('Error getting all regulatory updates:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

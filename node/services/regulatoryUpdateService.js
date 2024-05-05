const con = require('../database');
const socket = require('../socket');

// Add regulatory update
exports.addRegulatoryUpdate = async (update_text) => {
    try {
        // Save regulatory update to the database
        const result = await con.query("INSERT INTO regulatory_updates (update_text, update_date) VALUES (?, ?)", [update_text, new Date()]);

        // Emit the regulatory update to the WebSocket server
        socket.emit('regulatory_update', { id: result.insertId, update_text, update_date: new Date() });

        return { id: result.insertId, update_text, update_date: new Date() };
    } catch (error) {
        throw error;
    }
};

// Get all regulatory updates
exports.getAllRegulatoryUpdates = async (req , res) => {
    
        con.query("SELECT * FROM regulatory_updates",
        (err, result) => {
            if (err) {
                console.error('Error logging in:', err);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                    res.status(200).json(result);
            }
        }
    );
};

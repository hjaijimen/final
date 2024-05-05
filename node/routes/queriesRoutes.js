const express = require('express');
const router = express.Router();
const con = require('../database');

// POST endpoint to execute a query
router.post('/', async (req, res) => {
    const { queryString } = req.body;
    con.query(queryString,
        (err, result) => {
            if (err) {
                console.error('Error logging in:', err);
                res.status(500).json({ message: 'Internal server error' });
            } else {
              
                    res.status(200).json(result);
                
            }
        }
    );
});

module.exports = router;

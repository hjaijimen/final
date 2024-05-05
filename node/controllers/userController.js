const con = require('../database');

// Register a new user
exports.registerUser = (req, res) => {
    const { email, full_name, password, profession } = req.body;

    con.query("INSERT INTO users (email, full_name, password_hash, profession) VALUES (?, ?, ?, ?)", [email, full_name, password, profession],
        (err, result) => {
            if (err) {
                console.error('Error registering user:', err);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                res.status(201).json({ message: "User registered successfully" });
            }
        }
    );
};

// Login user
exports.loginUser = (req, res) => {
    const { email, password } = req.body;
    con.query("SELECT * FROM users WHERE email = ? AND password_hash = ?", [email, password],
        (err, result) => {
            if (err) {
                console.error('Error logging in:', err);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                if (result.length > 0) {
                    res.status(200).json(result[0]);
                } else {
                    res.status(401).json({ message: "Incorrect email or password" });
                }
            }
        }
    );
};


// Update user details
exports.updateUser = (req, res) => {
    const { user_id } = req.params;
    const { email, full_name, password, profession } = req.body;

    con.query("UPDATE users SET email = ?, full_name = ?, password_hash = ?, profession = ? WHERE user_id = ?", 
        [email, full_name, password, profession, user_id],
        (err, result) => {
            if (err) {
                console.error('Error updating user:', err);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                res.status(200).json({ message: "User updated successfully" });
            }
        }
    );
};

// Delete user
exports.deleteUser = (req, res) => {
    const { user_id } = req.params;

    con.query("DELETE FROM users WHERE user_id = ?", [user_id],
        (err, result) => {
            if (err) {
                console.error('Error deleting user:', err);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                res.status(200).json({ message: "User deleted successfully" });
            }
        }
    );
};


// Get user details
exports.getUser = (req, res) => {
    const { user_id } = req.params;

    con.query("SELECT * FROM users WHERE user_id = ?", [user_id],
        (err, result) => {
            if (err) {
                console.error('Error fetching user:', err);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                if (result.length > 0) {
                    res.status(200).json(result[0]);
                } else {
                    res.status(404).json({ message: "User not found" });
                }
            }
        }
    );
};

// Get users details
exports.getUsers = (req, res) => {
    const { user_id } = req.params;
    con.query("SELECT * FROM users",
        (err, result) => {
            if (err) {
                console.error('Error fetching users:', err);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                if (result.length > 0) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ message: "User not found" });
                }
            }
        }
    );
};

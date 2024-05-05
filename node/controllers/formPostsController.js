// controllers/formPostsController.js

const con = require('../database');

// Create a Form Post
exports.createFormPost = async (req, res) => {
    const { user_id, form_type, form_data } = req.body;

    try {
        const result = await con.query(
            "INSERT INTO form_posts (user_id, form_type, form_data) VALUES (?, ?, ?)",
            [user_id, form_type, form_data]
        );
        res.status(200).json({ message: "Form submitted successfully" });
    } catch (error) {
        console.error('Error creating form post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get All Form Posts
exports.getAllFormPosts = async (req, res) => {
    try {
        const formPosts = await con.query("SELECT * FROM form_posts");
        res.status(200).json(formPosts);
    } catch (error) {
        console.error('Error fetching form posts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get Form Post by ID
exports.getFormPostById = async (req, res) => {
    const postId = req.params.id;

    try {
        const formPost = await con.query("SELECT * FROM form_posts WHERE id = ?", [postId]);
        res.status(200).json(formPost);
    } catch (error) {
        console.error('Error fetching form post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update Form Post by ID
exports.updateFormPostById = async (req, res) => {
    const postId = req.params.id;
    const { user_id, form_type, form_data } = req.body;

    try {
        await con.query(
            "UPDATE form_posts SET user_id = ?, form_type = ?, form_data = ? WHERE id = ?",
            [user_id, form_type, form_data, postId]
        );
        res.status(200).json({ message: "Form post updated successfully" });
    } catch (error) {
        console.error('Error updating form post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete Form Post by ID
exports.deleteFormPostById = async (req, res) => {
    const postId = req.params.id;

    try {
        await con.query("DELETE FROM form_posts WHERE id = ?", [postId]);
        res.status(200).json({ message: "Form post deleted successfully" });
    } catch (error) {
        console.error('Error deleting form post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

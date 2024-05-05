const con = require('../database');

exports.submitForm = async (user_id, form_type, form_data) => {
    try {
        const result = await con.query(
            "INSERT INTO form_posts (user_id, form_type, form_data) VALUES (?, ?, ?)",
            [user_id, form_type, form_data]
        );
        return result;
    } catch (error) {
        throw error;
    }
};

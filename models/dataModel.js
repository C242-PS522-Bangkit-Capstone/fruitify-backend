const db = require('../db');

const createData = (user_id, fruit_name, fruit_image_url, fruit_condition, fruit_weight, nutrition_info) => {
    const query = `
        INSERT INTO data (user_id, fruit_name, fruit_image_url, fruit_condition, fruit_weight, nutrition_info)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [user_id, fruit_name, fruit_image_url, fruit_condition, fruit_weight, nutrition_info], (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

const getAllData = () => {
    const query = `
        SELECT * FROM data
    `;
    return new Promise((resolve, reject) => {
        db.query(query, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

module.exports = { createData, getAllData };

const db = require('../db');

const createUser = (name, email, password, gender) => {
    const query = `
        INSERT INTO users (name, email, password, gender)
        VALUES (?, ?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [name, email, password, gender], (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

const findUserByEmail = (email) => {
    const query = `
        SELECT * FROM users WHERE email = ?
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [email], (err, results) => {
            if (err) reject(err);
            else resolve(results[0]); // Return one user
        });
    });
};

module.exports = { createUser, findUserByEmail };

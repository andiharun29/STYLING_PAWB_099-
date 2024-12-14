const db = require('../config/database');

// Controller untuk membuat akun baru user
const registerUser = (req, res) => {
    const { username, password } = req.body;
    const sql = `INSERT INTO user (username, password) VALUES (?, ?)`;

    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error('Register Error:', err);
            return res.status(500).send('Gagal mendaftarkan user');
        }
        res.redirect('/login');
    });
};

// Controller untuk Render halaman registrasi
const renderRegisterPage = (req, res) => {
    res.render('Registrasi', {
        layout: 'layouts/main-layouts',
        title: 'Registrasi',
        showNavbar: false,
        showFooter: false,
    });
};

// Controller untuk Render halaman login
const renderLoginPage = (req, res) => {
    res.render('login', {
        layout: 'layouts/main-layouts',
        title: 'Login',
        showNavbar: false,
        showFooter: false,
    });
};

// Controller untuk user login
const loginUser = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    db.query('SELECT * FROM user WHERE username = ? AND password = ?', 
    [username, password], (err, results) => {
        if (err) {
            console.error('Database Error:', err);
            return res.status(500).send('Error fetching user');
        }

        if (results.length === 0) {
            console.log('Invalid login:', { username, password });
            return res.status(400).send('Invalid username or password');
        }

        req.session.userId = results[0].id;
        res.redirect('/');
    });
};

const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout Error:', err);
            return res.status(500).send('Error logging out');
        }
        res.redirect('/login');
    });
};

// Export semua controller
module.exports = {
    registerUser,
    renderRegisterPage,
    renderLoginPage,
    loginUser,
    logoutUser
};

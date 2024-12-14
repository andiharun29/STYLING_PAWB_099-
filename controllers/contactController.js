const db = require('../config/database');

// Render Halaman Kontak
const renderContactPage = (req, res) => {
    const sql = 'SELECT * FROM contact ORDER BY id DESC';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching contact messages:', err);
            return res.status(500).send('Error fetching contact messages');
        }
        res.render('contact', {
            layout: 'layouts/main-layouts',
            title: 'Contact Us',
            showNavbar: true,
            showFooter: true,
            contactMessages: results,
        });
    });
};

// Formulir Kontak Submit
const submitContactForm = (req, res) => {
    const { nama, email, pesan } = req.body;

    const sql = 'INSERT INTO contact (nama, email, pesan) VALUES (?, ?, ?)';
    db.query(sql, [nama, email, pesan], (err, result) => {
        if (err) {
            console.error('Error submitting contact form:', err);
            return res.status(500).send('Error submitting contact form');
        }
        res.redirect('/contact'); 
    });
};

// Fetch Pesan Kontak
const getContactMessages = (req, res) => {
    const sql = 'SELECT * FROM contact ORDER BY id DESC';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching contact messages:', err);
            return res.status(500).send('Error fetching contact messages');
        }
        res.render('contact-messages', {
            layout: 'layouts/main-layouts',
            title: 'Contact Messages',
            messages: results,
            showNavbar: true,
            showFooter: true,
        });
    });
};

module.exports = {
    renderContactPage,
    submitContactForm,
    getContactMessages,
};

const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/isLogin');
const autenfikasiController = require('../controllers/autentifikasiController');

// Routes untuk Register
router.get('/Registrasi', autenfikasiController.renderRegisterPage);
router.post('/Registrasi', autenfikasiController.registerUser);

// Routes untuk Login
router.get('/login', autenfikasiController.renderLoginPage);
router.post('/login', autenfikasiController.loginUser);

router.get('/logout', autenfikasiController.logoutUser);

router.get('/', isLoggedIn, (req, res) => {
    res.render('index', {
        layout: 'layouts/main-layouts',
        title: 'Home',
        showNavbar: true,
        showFooter: true,
    });
});

module.exports = router;

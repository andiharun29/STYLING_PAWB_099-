const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');

const session = require('express-session');
const expressEjsLayouts = require('express-ejs-layouts');

// Rute
const autentifikasiRoutes = require('./routes/autenfikasiRoutes');
const todoRoutes = require('./routes/todoRoutes');
const contactRoutes = require('./routes/contactRoutes');

app.use(session({
    secret: 'ti123',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.use(expressEjsLayouts);
app.set('layout', 'layouts/main-layouts');

app.use('/', autentifikasiRoutes);
app.use('/todo', todoRoutes);
app.use('/contact', contactRoutes);

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});

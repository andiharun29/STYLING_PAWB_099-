const db = require('../config/database');

// Ambil Daftar To-Do untuk Pengguna
const gettodo = (req, res) => {
    const id = req.session.id;

    if (!id) {
        return res.status(401).send('Unauthorized: User not logged in.');
    }

    // Ubah query untuk menyesuaikan kolom baru
    const sql = 'SELECT * FROM todo';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error fetching todo:', err.sqlMessage || err);
            return res.status(500).send('Error fetching todo. Please try again later.');
        }
        res.render('todo', {
            layout: 'layouts/main-layouts',
            title: 'My To-Do List',
            todo: results,
            showNavbar: true,
            showFooter: true,
        });
    });
};

// Tambah To-Do Baru
const addTodo = (req, res) => {
    const { nama_kegiatan, deskripsi_kegiatan } = req.body;

    // Query untuk menambahkan to-do baru
    const sql = 'INSERT INTO todo (nama_kegiatan, deskripsi_kegiatan) VALUES (?, ?)';
    db.query(sql, [nama_kegiatan, deskripsi_kegiatan], (err, result) => {
        if (err) {
            console.error('Error adding todo:', err.sqlMessage || err);
            return res.status(500).send('Error adding todo. Please try again later.');
        }
        res.redirect('/todo');
    });
};


// Tandai To-Do sebagai Selesai
const markTodoAsDone = (req, res) => {
    const { todo_id } = req.params;

    const sql = 'UPDATE todo SET is_done = 1 WHERE todo_id = ?';
    db.query(sql, [todo_id], (err, result) => {
        if (err) {
            console.error('Error marking todo as done:', err.sqlMessage || err);
            return res.status(500).send('Error marking todo as done. Please try again later.');
        }
        res.redirect('/todo');
    });
};

// Hapus To-Do
const deleteTodo = (req, res) => {
    const { todo_id } = req.params;

    const sql = 'DELETE FROM todo WHERE todo_id = ?';
    db.query(sql, [todo_id], (err, result) => {
        if (err) {
            console.error('Error deleting todo:', err.sqlMessage || err);
            return res.status(500).send('Error deleting todo. Please try again later.');
        }
        res.redirect('/todo');
    });
};

// Edit To-Do
const editTodo = (req, res) => {
    const { todo_id } = req.params;
    const { nama_kegiatan, deskripsi_kegiatan } = req.body;

    const sql = 'UPDATE todo SET nama_kegiatan = ?, deskripsi_kegiatan = ? WHERE todo_id = ?';
    db.query(sql, [nama_kegiatan, deskripsi_kegiatan, todo_id], (err, result) => {
        if (err) {
            console.error('Error editing todo:', err.sqlMessage || err);
            return res.status(500).send('Error editing todo. Please try again later.');
        }
        res.redirect('/todo');
    });
};

const HalamanTodo = (req, res) => {
    res.render('todo', {
        title: 'Todo',
        layout: 'layouts/main-layouts',
        shownav: true,
        showfooter: true
    });
};

module.exports = {
    gettodo,
    addTodo,
    markTodoAsDone,
    deleteTodo,
    editTodo,
    HalamanTodo
};

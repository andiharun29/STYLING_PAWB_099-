const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const { isLoggedIn } = require('../middlewares/isLogin');

// Routes for To-Do List
router.get('/', isLoggedIn, todoController.gettodo);
router.post('/add', isLoggedIn, todoController.addTodo);
router.post('/:id/done', isLoggedIn, todoController.markTodoAsDone);
router.post('/:id/delete', isLoggedIn, todoController.deleteTodo);
router.post('/edit/:id', isLoggedIn, todoController.editTodo);

router.get('/', isLoggedIn, (req, res) => {
    res.render('todo', {
        title: 'Todo',
        layout: 'layouts/main-layouts',
        shownav: true,
        showfooter: true
    });
});

module.exports = router;

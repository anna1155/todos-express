const TodoController = require('./controllers/todo.controller');
const { Router } = require('express');

const router = Router();

//get all todos
router.get('/todos', TodoController.getTodos);

//get task by id
router.get('/todos/:id', TodoController.getTodoById);

//create/add task to todos
router.post('/todos',TodoController.createTodo);

//update task by id
router.put(('/todos/:id'),TodoController.updateTodo);

//delete a task by id
router.delete('/todos/:id', TodoController.deleteTodo);

module.exports = router ;
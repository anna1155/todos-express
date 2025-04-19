const TodoDBModel = require('../models/todo.db.model');

const getTodoById = async (req,res) => {
    const id = req.params.id;
    const todo = await TodoDBModel.findOne(id);
    if(!todo) {
        return res.status(500).json({
            message: 'Task not found'
        });
    }
    return res.status(200).json({
        message: 'Task fetched successfully',
        data: todo
    });
};

const getTodos = async (req,res) => {
    return res.status(200).json({
        message: 'Fetched all todos successfully',
        data: await TodoDBModel.getAll()
    });
};

const createTodo = async (req,res) => {
    const title = req.body.title;
    if(!title) return res.status(400).json({
        message: 'Title not found',
    });
    await TodoDBModel.createOne({
        title: title
    });

    return res.status(201).json({
        message: 'Task created successfully',
    }) 
};

const updateTodo = async (req,res, next) => {
    const id = req.params.id;
    const todo = await TodoDBModel.findOne(id);
    if(!todo) return res.status(404).json({
        message: 'Task not found'
    })

    const {title, isCompleted} = req.body;
    const data = {title, isCompleted};
    if(title && isCompleted) await TodoDBModel.updateOne(id, data);
    if(!isCompleted && !title) return res.status(404).json({
        message: 'Task not found'
    });

    return res.status(200).json({
        message: 'Task updated successfully',
        data: await TodoDBModel.findOne(id)
    })
};

const deleteTodo =  async (req,res) => {
    const id = req.params.id;
    const todo = await TodoDBModel.findOne(id);

    if(todo < 0) return res.status(404).json({
        message: 'Task not found'
    })

    await TodoDBModel.deleteOne(todo);

    return res.status(200).json({
        message:'Task deleted successfully'
    })
};

module.exports = {
    getTodoById,
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
};
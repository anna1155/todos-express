const express = require('express');
const cors = require('cors');
const {readFile, writeFile} = require('./helper/file.helper');
const filePath = './data/todos.json';

const app = express();
app.use(cors());
const port = 5000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

/*app.get('/',(req,res) => {
    return res.send(`
        <h1 style="color : darkgreen;">HOME PAGE</h1>
        <button onclick="alert('you clicked the button');">click me</button>
        `);
});*/

let todos = readFile(filePath);
//save middleware
const save = (req,res) => {
    writeFile(filePath, todos);
}

//TODO APP routes
//get : get all tasks
//get : get task by id
//post : create new task
//put : update a task by id
//delete : delete task by id

/*const todos = [
    {id: 1, title: 'Learn Node.js', isCompleted: false},
    {id: 2, title: 'Learn Express.js', isCompleted: false},
    {id: 3, title: 'Learn React.js', isCompleted: true},
    {id: 4, title: 'Learn Prisma.ORM', isCompleted: false}
];*/

//const todos = JSON.parse(fs.readFileSync('./todos.json'));


//get all todos
app.get('/todos',(req,res) => {
    return res.status(200).json({
        message: 'Fetched all todos successfully',
        data: todos
    });
});

//get task by id
app.get('/todos/:id',(req,res) => {
    const id = req.params.id;
    const todo = todos.find(todo => todo.id === parseInt(id));
    if(!todo) {
        return res.status(500).json({
            message: 'Task not found'
        });
    }
    return res.status(200).json({
        message: 'Task fetched successfully',
        data: todo
    });
});

//create/add task to todos
app.post('/todos', (req,res,next) => {
    const title = req.body.title;
    if(!title) return res.status(400).json({
        message: 'Title not found',
    });

    const newTodo = {
        id: todos.length+1,
        title,
        isCompleted: false
    }
    todos.push(newTodo);

    res.status(201).json({
        message: 'Task created successfully',
        data: newTodo
    }) 
    return next();
}, save);

//update task by id
app.put(('/todos/:id'), (req,res, next) => {
    const id = req.params.id;
    const todo = todos.find(todo => todo.id === parseInt(id));
    if(!todo) return res.status(404).json({
        message: 'Task not found'
    })

    const {title, isCompleted} = req.body;
    if(title && isCompleted) todo.title = title; todo.isCompleted = isCompleted;
    if(!isCompleted && !title) return res.status(404).json({
        message: 'Task not found'
    });

    res.status(200).json({
        message: 'Task updated successfully',
        data: todo
    })
    return next();
}, save);

//delete a task by id
app.delete('/todos/:id', (req,res,next) => {
    const id = req.params.id;
    const todo = todos.findIndex(todo => todo.id === parseInt(id));

    if(todo < 0) return res.status(404).json({
        message: 'Task not found'
    })

    todos.splice(todo,1);

    res.status(200).json({
        message:'Task deleted successfully'
    })
    return next();
}, save);

app.listen(port,() => {
    console.log('Server running on port 5000');
});
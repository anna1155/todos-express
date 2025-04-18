const express = require('express');
const router = require('./router');

const app = express();
const cors = require('cors');
app.use(cors());

const port = 5000;
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(router);
app.listen(port,() => {
    console.log(`Server running on port ${port}`);
});
/*app.get('/',(req,res) => {
    return res.send(`
        <h1 style="color : darkgreen;">HOME PAGE</h1>
        <button onclick="alert('you clicked the button');">click me</button>
        `);
});*/

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

/*


//welcome page
app.get('/home',(req,res) => {
    res.send(`
        <h1 style="color: pink; font-size: 36px; text-align: center;">Hello World</h1>
    `);
});


*/

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

const todos = [];

app.listen(PORT, console.log(`Listening on port ${PORT}`));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/v1/todos', (req, res) => {
    res.json(todos);
});

app.get('/api/v1/todos/:id', (req, res) => {
    if(!todos[req.params.id]){
        return res.status(404).json({msg: "Todo of that ID was not found"})
    }

    res.json(todos[req.params.id]);
});

app.post('/api/v1/todos', (req, res) => {
    const newTodo = {
        id: todos.length,
        todo: req.body.todo,
        completed: req.body.completed
    };

    if(!newTodo.todo){
        return res.status(400).json({msg: "Please enter a todo task"});
    }

    todos.push(newTodo);
    res.send("POST request successful");
});

app.put('/api/v1/todos/:id', (req, res) => {
    const isFound = todos.some(todo => parseInt(req.params.id) === todo.id);    

    if(isFound) {
        const updatedTodo = req.body;
        const todoId = req.params.id;
        
        todos[todoId].todo = updatedTodo.todo ? updatedTodo.todo : todos[todoId].todo;
        todos[todoId].completed = ((typeof updatedTodo.completed).localeCompare("undefined")) ? updatedTodo.completed : todos[todoId].completed;

        res.json(todos[todoId]);
    } else {
        return res.status(404).send("Todo was not found");
    }
});

app.delete('/api/v1/todos/:id', (req, res) => {
    const isFound = todos.some(todo => parseInt(req.params.id) === todo.id);    

    if(isFound) {
        todos.splice(req.params.id, 1);
        res.send("Todo removed");
    } else {
        return res.status(404).send("Todo was not found");
    }
});


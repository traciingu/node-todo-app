const express = require('express');
const router = express.Router();

const todos = [];

router.get('/', (req, res) => {
    res.json(todos);
});

router.get('/:id', (req, res) => {
    if(!todos[req.params.id]){
        return res.status(404).json({msg: "Todo of that ID was not found"})
    }

    res.json(todos[req.params.id]);
});

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
    const isFound = todos.some(todo => parseInt(req.params.id) === todo.id);    

    if(isFound) {
        todos.splice(req.params.id, 1);
        res.send("Todo removed");
    } else {
        return res.status(404).send("Todo was not found");
    }
});


module.exports = router;

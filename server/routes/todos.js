const express = require('express');
const router = express.Router();

const Todo = require('../models/todo');

router.get('/', (req, res) => {
    let filter = {};
    const query = req.query.filter ? req.query.filter.toLowerCase() : '';
    
    if(query === 'all'){
        filter = {};
    } else if(query === 'active'){
        filter = {completed: false};
    } else if(query === 'completed'){
        filter = {completed: true};
    }

    Todo.find(filter)
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
});

router.get('/:id', (req, res) => {
    if (!Todo.findById(req.params.id)) {
        return res.status(404).json({ msg: "Todo of that ID was not found" })
    }

    Todo.findById(req.params.id)
        .then((result) => res.send(result))
        .catch((err) => console.log(err));

});

router.post('/', async (req, res) => {
    const newTodo = new Todo({
        name: req.body.name,
        completed: req.body.completed
    });

    if (!newTodo.name) {
        return res.status(400).json({ msg: "Please enter a todo task" });
    }

    console.log(await newTodo.save()
        .then((result) => result)
        .catch((err) => console.log(err)));
});

router.put('/:id', (req, res) => {
    Todo.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' })
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
});

router.delete('/:id', (req, res) => {
    Todo.findByIdAndDelete(req.params.id)
        .then((results) => res.send(results))
        .catch((err) => console.log(err));
});


module.exports = router;

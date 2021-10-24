const express = require('express');
const app = express();
const mongoose = require('mongoose');

const dbURI = "mongodb+srv://dbUser:D48wwEkBf9Tkkujn@cluster0.fvgd6.mongodb.net/node-todo-app?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('Connected to db');
        app.listen(PORT, console.log(`Listening on port ${PORT}`));
    })
    .catch((err) => console.log(err));

const todoRouter = require('../routes/todos.js');

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/todos', todoRouter);


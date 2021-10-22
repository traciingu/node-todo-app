const express = require('express');
const app = express();

const todoRouter = require('../routes/todos.js');

const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log(`Listening on port ${PORT}`));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/todos', todoRouter);


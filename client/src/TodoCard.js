import React, { useEffect, useState } from 'react';
import './style/TodoCard.css';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { BsMoon } from 'react-icons/bs';
import { HiSun } from 'react-icons/hi';

import { getTodos, createTodo, updateTodo, deleteTodo } from './todoServices';

export default function TodoCard() {
    const [todos, setTodos] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all'); // all, active, completed
    const [themeState, setThemeState] = useState('light');

    const handleSubmit = async (name, completed) => {
        await createTodo({ name: name, completed: completed });
    };

    const handleUpdate = async (id, name, completed) => {
        await updateTodo(id, {name: name, completed: completed});
    };

    const handleDelete = async (id) => {
        await deleteTodo(id);
    };

    const getFilteredTodos = async () => {
        try {
            setTodos(await getTodos(activeFilter).then((result) => result.data));
        } catch (err) {
            console.log(err);
        }

    };

    const clearCompleted = async () => {
        try {
            await getTodos('completed').then((result) => result.data.map((todo) => handleDelete(todo._id)));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getFilteredTodos();
    }, []);

    useEffect(() => {
        getFilteredTodos();
    }, [activeFilter, todos]);

    return (
        <div className={"todo-card " + themeState}>
            <header className={themeState.toLowerCase() === 'light' ? 'light' : 'dark'}>
                <div className="inner-header">
                    <h1 className="uppercase title">Todo</h1>
                    <button type="button" className="theme-switch-btn" onClick={() => themeState.toLowerCase() === 'light' ? setThemeState('dark') : setThemeState('light')}>{themeState.toLowerCase() === 'light' ? <BsMoon /> : <HiSun />}</button>
                </div>
            </header>

            <div className="todo-card-body">
                <TodoForm addTodo={handleSubmit} themeState={themeState} />
                <TodoList todos={todos} editTodo={handleUpdate} removeTodo={handleDelete} themeState={themeState} />

                <div className={"todo-card-options " + themeState}>
                    <div className={"inner-card-options " + themeState}>
                        <p>{todos.length} items left</p>
                        <button onClick={() => clearCompleted()} >Clear Completed</button>
                    </div>
                    <div className={"todo-card-filters " + themeState}>
                        <button onClick={() => setActiveFilter('all')} className={activeFilter.toLowerCase() === "all" ? "active" : ""}>All</button>
                        <button onClick={() => setActiveFilter('active')} className={activeFilter.toLowerCase() === "active" ? "active" : ""}>Active</button>
                        <button onClick={() => setActiveFilter('completed')} className={activeFilter.toLowerCase() === "completed" ? "active" : ""}>Completed</button>
                    </div>
                </div>
            </div>

        </div>
    );
}


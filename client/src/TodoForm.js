import React, { useState } from 'react';
import './style/TodoForm.css';
import CompleteButton from './CompleteButton';
import {FiPlus} from 'react-icons/fi';

export default function TodoForm({ addTodo, themeState }) {
    const [name, setName] = useState("");
    const [completed, setCompleted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name.trim().length > 0) {
            setCompleted(false);
            addTodo(name, completed);
            setName("");
        }
    };

    const handleClick = () => {
        setCompleted(!completed);
    };

    return (
        <form className={`card-item create-todo-form ${themeState} ${completed ? "completed" : ""}`} onSubmit={handleSubmit}>
            <CompleteButton isComplete={completed} handleClick={handleClick}/>
            <input type="text" placeholder="Create a new todo..." className={"card-item-name " + (completed ? "strike" : "")} value={name} onChange={(e) => setName(e.target.value)} />
            <button type="submit" className="create-todo-form-btn"><FiPlus/></button>
        </form>
    );
}
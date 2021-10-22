import React, { useState } from 'react';
import './style/TodoList.css';
import CompleteButton from './CompleteButton';
import {FiEdit2, FiTrash2, FiCheck, FiXCircle} from 'react-icons/fi';

export default function TodoList({ todos, editTodo, removeTodo, themeState }) {
    const [editingItemId, setEditingItemId] = useState(-1);
    const [editInput, setEditInput] = useState("");
    const [removeItemId, setRemoveItemId] = useState(-1);


    const submitEdit = (e, id, name, completed) => {
        e.preventDefault();
        editTodo(id, name, completed);
        setEditingItemId(-1);
        setEditInput("");
    };

    const handleRemove = (index) => {
        setRemoveItemId(index); 

        setTimeout(() => {
            removeTodo(index);
            setRemoveItemId(-1);
        }, 470);
    };

    return (
        <div className="todo-list">
            {todos.map((todo, index) => {
                return editingItemId === index ?
                    <form className={`card-item todo-item ${themeState} ${todo.completed ? "completed" : ""}`} key={index} onSubmit={e => { console.log(e.target[1].value); submitEdit(e, index, e.target[1].value, todo.completed) }}>
                        <CompleteButton isComplete={todo.completed} handleClick={editTodo} handleClickParams={[index, todo.name, !todo.completed]} />
                        <input type="text" className={todo.completed ? "strike" : ""} value={editInput} onChange={(e) => { setEditInput(e.target.value) }} />
                        <div className="todo-item-options">
                            <button type="button" className="todo-item-cancel" onClick={() => setEditingItemId(-1)}><FiXCircle/></button>
                            <button type="submit" className="todo-item-submit"><FiCheck/></button>
                        </div>
                    </form>
                    : <div className={`card-item todo-item ${themeState} ${todo.completed ? "completed" : ""} ${removeItemId === index ? "removed" : ""}`} key={index}>
                        <CompleteButton isComplete={todo.completed} handleClick={editTodo} handleClickParams={[index, todo.name, !todo.completed]} />
                        <p className={"todo-item-name card-item-name " + (todo.completed ? "strike" : "")}>{todo.name}</p>
                        <div className="todo-item-options">
                            <button className="todo-item-delete" onClick={() => { handleRemove(index) }}><FiTrash2/></button>
                            <button className="todo-item-edit" onClick={() => { setEditingItemId(index); setEditInput(todo.name); }}><FiEdit2/></button>
                        </div>
                    </div>
            }
            )}
        </div>
    );
}
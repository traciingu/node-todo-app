import React from 'react';
import ReactDOM from 'react-dom';
import './style/Index.css';
import TodoCard from './TodoCard';

export default function App() {
    return (
        <TodoCard />
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
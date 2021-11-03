import axios from 'axios';
const apiUrl = "http://localhost:3001/api/v1/todos";

export function getTodos(query = ''){
    return axios.get(`${apiUrl}?filter=${query}`);
}

export function getTodo(id){
    return axios.get(`${apiUrl}/${id}`);
}

export function createTodo(todo){
    return axios.post(apiUrl, todo);
}

export function updateTodo(id, todo){
    return axios.put(`${apiUrl}/${id}`, todo);
}

export function deleteTodo(id){
    return axios.delete(`${apiUrl}/${id}`);
}
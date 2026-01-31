
import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const registerUser = (data) => axios.post(`${API_URL}/auth/register`, data);
export const loginUser = (data) => axios.post(`${API_URL}/auth/login`, data);
export const getTareas = (token) => axios.get(`${API_URL}/tareas`, {
  headers: { Authorization: `Bearer ${token}` }
});

export const createTarea = (data, token) => axios.post(`${API_URL}/tareas`, data, {
  headers: { Authorization: `Bearer ${token}` }
});

export const updateTarea = (id, data, token) => axios.put(`${API_URL}/tareas/${id}`, data, {
  headers: { Authorization: `Bearer ${token}` }
});

export const deleteTarea = (id, token) => axios.delete(`${API_URL}/tareas/${id}`, {
  headers: { Authorization: `Bearer ${token}` }
});
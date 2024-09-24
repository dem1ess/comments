import axios from 'axios'

// Настройка базового URL для всех запросов
export const instance = axios.create({
	baseURL: 'https://dummyjson.com',
})

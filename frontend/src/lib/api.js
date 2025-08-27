import axios from 'axios'

export const api = axios.create({
  baseURL: '/api',
})

export const fetchEvents = () => api.get('/event')
export const fetchEventById = (id) => api.get(`/event/${id}`)



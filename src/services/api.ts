import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://loaclhost:3000/api'
})
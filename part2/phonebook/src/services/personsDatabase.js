import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)         
}

const create = (newPerson) => {
    return axios.post(baseUrl, newPerson)
}

const remove = (id) => {
   const personUrl = `${baseUrl}/${id}`
   return axios.delete(personUrl)
}

export default {getAll, create, remove}
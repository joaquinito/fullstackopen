import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (personData) => {
    return axios.post(baseUrl, personData)
}

const replace = (id, personData) => {
    const personUrl = `${baseUrl}/${id}`
    return axios.put(personUrl, personData)
}

const remove = (id) => {
    const personUrl = `${baseUrl}/${id}`
    return axios.delete(personUrl)
}

export default { getAll, create, replace, remove }
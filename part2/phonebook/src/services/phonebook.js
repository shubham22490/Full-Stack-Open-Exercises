import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    return (
        axios
            .get(baseURL)
            .then(resp => resp.data)
    )
}

const addNumber = (data) => {
    return (
        axios
            .post(baseURL, data)
            .then(resp => resp.data)
    )
}

const remove = (id) => {
    return (
        axios
            .delete(`${baseURL}/${id}`)
            .then(resp => resp.data)
    )
}

const update = (data) => {
    return (
        axios
            .put(`${baseURL}/${data.id}`, data)
            .then(resp => resp.data)
    )
}

export default { getAll, addNumber, remove, update }
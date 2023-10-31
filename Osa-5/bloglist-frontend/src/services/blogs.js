import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newObject, auth) => {
  setToken(auth)
  const config = { headers: { Authorization: token } }

  return axios.post(baseUrl, newObject, config)
    .then(response => response.data)
    .catch(error => {
      throw error
    })
}

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl } /${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken }
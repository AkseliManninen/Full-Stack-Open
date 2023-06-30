import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

// tapahtumaläsittelijä: hakee yhteytiedot palvelimelta
const getAll = () => {
  return axios.get(baseUrl)
}

// tapahtumaläsittelijä: luo uuden yhteystiedon palvelimelle
const create = newObject => {
  return axios.post(baseUrl, newObject)
}

// tapahtumaläsittelijä: poistaa yhteystiedon palvelimelta
const deletePerson =(id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { 
  getAll: getAll, 
  create: create, 
  deletePerson, deletePerson,
}

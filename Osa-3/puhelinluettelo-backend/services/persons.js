import axios from 'axios'
const baseUrl = 'https://render-test-uplh.onrender.com/api/persons'

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

// tapahtumakäsittelijä: päivittää olemassa olevalle yhteystiedolle numeron palvelimelle
const updateNumber =(id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

export default { 
  getAll: getAll, 
  create: create, 
  deletePerson, deletePerson,
  updateNumber: updateNumber
}

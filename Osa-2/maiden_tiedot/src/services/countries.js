import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

// tapahtumaläsittelijä: hakee maatiedot palvelimelta
const getAll = () => {
  return axios.get(baseUrl)
}

export default { 
    getAll: getAll, 
  }
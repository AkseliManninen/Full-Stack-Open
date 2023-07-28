import axios from 'axios'
const apiKey = process.env.REACT_APP_API_KEY

// tapahtumaläsittelijä: hakee säätiedot sääapista
const getWeather = (capital) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}`
    return axios.get(apiUrl)
}

export default { 
    getWeather: getWeather, 
  }
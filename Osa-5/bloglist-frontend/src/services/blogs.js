import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (newObject) => {
  const config = { headers: { Authorization: token } }
  console.log("Creating configuration")
  console.log(config)

  try {
    console.log("Starting posting")
    const response = await axios.post(baseUrl, newObject, config)
    console.log("reponse acquired")
    return response.data
  } 
  catch (error) {
    throw error
  }
}

const update = async (id, newObject) => {
  const response = await axios.put(`${ baseUrl }/${id}`, newObject)
  
  try {
  return response.data
  }
  catch (error) {
    throw error
  }
}

const remove = async (id) => {
  console.log("Removing the blog in services/blogs.js")

  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${ baseUrl }/${id}`, config)
  
  try {
  return response.data
  }
  catch (error) {
    throw error
  }
}

export default { getAll, create, update, setToken, remove }
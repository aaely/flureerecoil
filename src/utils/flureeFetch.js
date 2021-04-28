import axios from 'axios'

const flureeFetch = async (uri, body) => {
  try {
    const fullUri = 'http://192.168.0.248:8080/fdb/aaely/dispensary' + uri
      const response = await axios({
        url: fullUri,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(body) 
      })
      return response.data
  } catch (error) {
    console.log(error)
  }
}

const signedFlureeFetch = async (uri, body, token) => {
  try {
      const fullUri = process.env.FLUREEURL + uri
      const response = await axios({
      url: fullUri,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': "Bearer " + token
      },
      data: JSON.stringify(body)
      })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const createFlureeUser = async (body) => {
  try {
      const fullUri = process.env.FLUREEURL + '/pw/generate'
      const response = await axios({
      url: fullUri,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify(body)
      })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const flureeLogin = async (body) => {
  try {
      const fullUri = process.env.FLUREEURL + '/pw/login'
      const response = await axios({
      url: fullUri,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify(body)
      })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export { flureeFetch, signedFlureeFetch, createFlureeUser, flureeLogin };
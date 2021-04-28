import axios from 'axios'

const token = async () => {
    const getUserToken = await axios.get('/api/current_user')
    console.log(getUserToken)
    return getUserToken
}

export { token }
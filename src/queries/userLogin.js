import { flureeFetch } from '../utils/flureeFetch'

const userLogin = async (username, password) => {
  const login = {
    username,
    password
  }
  const res = await flureeFetch('/pw/login', login)
  return res
}

export { userLogin };
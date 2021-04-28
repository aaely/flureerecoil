import { flureeFetch } from '../utils/flureeFetch'

const query_multi = {
    "select": [
      "*"
    ],
    "from": "location"
  }



const fetchLocations = async () => {
    const res = await flureeFetch('/query', query_multi)
    return res
}

const fetchLocation = async (locationHandle) => {
  let query_single = {
    "select": [
      "*"
    ],
    "from": ["location/handle", `${locationHandle}`]
  }
  const res = await flureeFetch('/query', query_single)
  return res
}

export { fetchLocations, fetchLocation };
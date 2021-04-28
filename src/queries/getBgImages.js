import { flureeFetch } from '../utils/flureeFetch'


  const query = {
    "select": [
      "*"
    ],
    "from": "sidebar"
  }

  const getBgImages = async () => {
    const res = await flureeFetch('/query', query)
    return res
}

export { getBgImages }
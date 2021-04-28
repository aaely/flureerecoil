import { flureeFetch } from '../utils/flureeFetch'

const query_multi = {
    "select": [
      "*"
    ],
    "from": "terpene"
  }

const query_single = {
    "select": [
      "*"
    ],
    "from": "terpene"
  }

const fetchTerpenes = async () => {
    const res = await flureeFetch('/query', query_multi)
    console.log(res)
    return res
}

const fetchTerpene = async () => {
    const res = await flureeFetch('/query', query_single)
    return res
}

const fetchTerpeneProducts = async (terpeneHandle) => {
  const query_products = {
    "select": [
      {"terpene/products": ["*", {"product/productProfileId": ["*"]}]}
    ],
    "from": ["terpene/handle", `${terpeneHandle}`]
  }
  const res = await flureeFetch('/query', query_products)
  console.log(res)
  return res
}

export { fetchTerpenes, fetchTerpene, fetchTerpeneProducts };
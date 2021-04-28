import { flureeFetch } from '../utils/flureeFetch'

const query_multi = {
    "select": [
      "*"
    ],
    "from": "cannabinoid"
  }

const fetchCannabinoids = async () => {
    const res = await flureeFetch('/query', query_multi)
    return res
}

const fetchCannabinoid = async (cannabinoidHandle) => {
    let query_single = {
      "select": [
        "*"
      ],
      "from": ["cannabinoid/handle", `${cannabinoidHandle}`]
    }
    const res = await flureeFetch('/query', query_single)
    return res
}

const fetchCannabinoidProducts = async (cannabinoidHandle) => {
  const query_products = {
    "select": [
      {"cannabinoid/products": ["*", {"product/productProfileId": ["*"]}]}
    ],
    "from": ["cannabinoid/handle", `${cannabinoidHandle}`]
  }
  const res = await flureeFetch('/query', query_products)
  return res
}

export { fetchCannabinoids, fetchCannabinoid, fetchCannabinoidProducts };
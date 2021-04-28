import { flureeFetch } from '../utils/flureeFetch'

const query_multi = {
    "select": [
      "*"
    ],
    "from": "category"
  }



const fetchCategories = async () => {
    const res = await flureeFetch('/query', query_multi)
    return res
}

const fetchCategory = async (categoryHandle) => {
    let query_single = {
        "select": [
          "*"
        ],
        "from": ["category/handle", `${categoryHandle}`]
      }
    const res = await flureeFetch('/query', query_single)
    return res
}

export { fetchCategories, fetchCategory };
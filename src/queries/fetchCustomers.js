import { flureeFetch } from '../utils/flureeFetch'

const query_multi = {
    "select": [
      "*"
    ],
    "from": "categories"
  }

const query_single = {
    "select": [
      "*"
    ],
    "from": "categories"
  }

const fetchCustomers = async () => {
    const res = await flureeFetch('/query', query_multi)
    return res
}

const fetchCustomer = async () => {
    const res = await flureeFetch('/query', query_single)
    return res
}

export { fetchCustomers, fetchCustomer };
import { flureeFetch } from '../utils/flureeFetch'

const getMyPurchases = async (_address) => {
    let query_single = {
        "select": [
          "*", {"customer/purchases": ["*"]}
        ],
        "from": ["customer/handle", `${_address}`]
      }
    const res = await flureeFetch('/query', query_single)
    return res
}

export { getMyPurchases };
import { flureeFetch } from '../utils/flureeFetch'

const query_multi = {"select":[
  "*", {"product/category": ["*"]} ,{"product/productProfileId": ["*", {"productprofile/terpeneIds": ["*"]}, {"productprofile/cannabinoidIds": ["*"]}]}
  ],
  
  "from":"product"}

const fetchProducts = async () => {
    const res = await flureeFetch('/query', query_multi)
    return res
}

const fetchProduct = async (productHandle) => {
    let query_single = {
        "select": [
          "*", {"product/category": ["*"]} ,{"product/productProfileId": ["*", {"productprofile/terpeneIds": ["*"]}, {"productprofile/cannabinoidIds": ["*"]}]}
        ],
        "from": ["product/handle", `${productHandle}`]
      }
      console.log(query_single)
    const res = await flureeFetch('/query', query_single)
    return res
}

export { fetchProducts, fetchProduct };
import { flureeFetch } from '../utils/flureeFetch'

const updateCannabinoid = async (_id, name, effectDesc, products) => {
    const update_cannabinoid = [{
        "_id": _id,
        "name": `${name}`,
        "effectDesc": `${effectDesc}`,
        "products": products
    }]

    const res = await flureeFetch('/transact', update_cannabinoid)
    return res
}

const updateCannabinoidProduct = async (c_id, p_id) => {
    const update_cannabinoid = [{
        "_id": c_id,
        "cannabinoid/products": [p_id]
    }]

    const res = await flureeFetch('/transact', update_cannabinoid)
    return res
}

export { updateCannabinoid, updateCannabinoidProduct };
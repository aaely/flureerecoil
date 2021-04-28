import { flureeFetch } from '../utils/flureeFetch'

const updateTerpene = async (_id, name, scentDesc, effectDesc, products) => {
    const update_terpene = [{
        "_id": _id,
        "name": `${name}`,
        "scentDesc": `${scentDesc}`,
        "effectDesc": `${effectDesc}`,
        "products": products
    }]

    const res = await flureeFetch('/transact', update_terpene)
    return res
}

const updateTerpeneProduct = async (t_id, p_id) => {
    const update_terpene = [{
        "_id": t_id,
        "terpene/products": [p_id]
    }]

    const res = await flureeFetch('/transact', update_terpene)
    return res
}

export { updateTerpene, updateTerpeneProduct };
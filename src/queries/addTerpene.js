import { flureeFetch } from '../utils/flureeFetch'

const addTerpene = async (name, scentDesc, effectDesc) => {
    const add_terpene = [{
        "_id": "terpene",
        "handle": `terp_${name}`,
        "name": `${name}`,
        "scentDesc": `${scentDesc}`,
        "effectDesc": `${effectDesc}`
    }]

    const res = await flureeFetch('/transact', add_terpene)
    return res
}

export { addTerpene };
import { flureeFetch } from '../utils/flureeFetch'

const addCannabinoid = async (name, effectDesc) => {
    const add_cannabinoid = [{
        "_id": "cannabinoid",
        "handle": `cannabinoid_${name}`,
        "name": `${name}`,
        "effectDesc": `${effectDesc}`
    }]

    const res = await flureeFetch('/transact', add_cannabinoid)
    return res
}

export { addCannabinoid };
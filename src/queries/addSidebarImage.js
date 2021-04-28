import { flureeFetch } from '../utils/flureeFetch'

const addSidebarImage = async (imageHash) => {
    const add_sidebarImage = [{
        "_id": "sidebar",
        "imageHashes": [imageHash]
    }]

    const res = await flureeFetch('/transact', add_sidebarImage)
    return res
}

export { addSidebarImage };
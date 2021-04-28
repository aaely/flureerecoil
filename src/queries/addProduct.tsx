import { flureeFetch } from '../utils/flureeFetch'
import { updateTerpeneProduct } from './updateTerpene'
import { updateCannabinoidProduct } from './updateCannabinoid'

const addProduct = async (name: string, category: number, cost: number, inventory: number, imgHash: string, cannabinoidIds: number[], cannabinoidConcentrations: JSON[], terpeneIds: number[], terpeneConcentrations: JSON[]) => {
    
    const add_product = [{
        "_id": "product",
        "handle": `product_${name}`,
        "name": name,
        "category": category,
        "cost": cost,
        "inventory": inventory,
        "productProfileId": "productprofile$product",
        "imageHash": imgHash
    },{
        "_id": "productprofile$product",
        "productId": "product$1",
        "cannabinoidIds": cannabinoidIds,
        "cannConc": cannabinoidConcentrations,
        "terpeneIds": terpeneIds,
        "terpConc": terpeneConcentrations
    }]

    const res = await flureeFetch('/transact', add_product)

    for(let i: number = 0; i < terpeneIds.length; i++) {
        await updateTerpeneProduct(terpeneIds[i], res.tempids.product$1)
    }

    for(let i: number = 0; i < cannabinoidIds.length; i++) {
        await updateCannabinoidProduct(cannabinoidIds[i], res.tempids.product$1)
    }
    
    return res
}

export { addProduct };
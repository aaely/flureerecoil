import { Cannabinoid, Terpene } from 'src/types/types.ts'
import { updateTerpeneProduct } from './updateTerpene'
import { updateCannabinoidProduct } from './updateCannabinoid'
import { flureeFetch } from '../utils/flureeFetch'

const updateProduct = async (id: number, name: string, category: number, cost: number, inventory: number, imgHash: string, productProfileId: number, cannabinoidIds: Cannabinoid[], cannabinoidConcentrations: any, terpeneIds: Terpene[], terpeneConcentrations: any) => {

    for(let i: number = 0; i < terpeneIds.length; i++) {
        await updateTerpeneProduct(terpeneIds[i], id)
    }

    for(let i: number = 0; i < cannabinoidIds.length; i++) {
        await updateCannabinoidProduct(cannabinoidIds[i], id)
    }
    
    const update_product = [{
        "_id": id,
        "name": `${name}`,
        "category": category,
        "cost": cost,
        "inventory": inventory,
        "imageHash": `${imgHash}`
    },{
        "_id": productProfileId,
        "cannabinoidIds": cannabinoidIds,
        "cannConc": cannabinoidConcentrations,
        "terpeneIds": terpeneIds,
        "terpConc": terpeneConcentrations
    }]

    const delete_profile = [{
        "_id": productProfileId,
        "cannabinoidIds": null,
        "cannConc": null,
        "terpeneIds": null,
        "terpConc": null
    }]

    await flureeFetch('/transact', delete_profile)
    const res = await flureeFetch('/transact', update_product)
    return res
}

export { updateProduct };
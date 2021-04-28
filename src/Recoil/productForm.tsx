import { atom, selector } from 'recoil'
import { Category, initCategory, Terpene, initTerpene, Cannabinoid, initCannabinoid } from '../types/types.ts'
import { getCategories } from './fluree'

export const activeProduct = atom<any>({
    key: 'activeProduct',
    default: []
})


export const productName = atom<string>({
    key: 'productName',
    default: '',
    persistence_UNSTABLE: {
        type: 'productName'
    }
})

export const buffer = atom<Array<number>>({
    key: 'buffer',
    default: [],
    persistence_UNSTABLE: {
        type: 'buffer'
    }
})

export const uploadedImages = atom<Array<any>>({
    key: 'uploadedImages',
    default: [],
    persistence_UNSTABLE: {
        type: 'uploadedImages'
    }
})

export const productInventory = atom<number>({
    key: 'productInventory',
    default: 0,
    persistence_UNSTABLE: {
        type: 'productName'
    }
})

export const productCost = atom<number>({
    key: 'productCost',
    default: 0,
    persistence_UNSTABLE: {
        type: 'productCost'
    }
})

export const category = atom<Category>({
    key: 'category',
    default: initCategory(),
    persistence_UNSTABLE: {
        type: 'category'
    },
    dangerouslyAllowMutability: true
})

export const selectedTerps = atom<Array<Terpene>>({
    key: 'selectedTerps',
    default: [initTerpene()],
    persistence_UNSTABLE: {
        type: 'selectedTerps'
    },
    dangerouslyAllowMutability: true
})

export const selectedCanns = atom<Array<Cannabinoid>>({
    key: 'selectedCanns',
    default: [initCannabinoid()],
    persistence_UNSTABLE: {
        type: 'selectedCanns'
    },
    dangerouslyAllowMutability: true
})

export const terpConcentrations = atom<Array<number>>({
    key: 'terpConcentrations',
    default: [],
    persistence_UNSTABLE: {
        type: 'terpConcentrations'
    },
    dangerouslyAllowMutability: true
})

export const cannConcentrations = atom<Array<number>>({
    key: 'cannConcentrations',
    default: [],
    persistence_UNSTABLE: {
        type: 'cannConcentrations'
    },
    dangerouslyAllowMutability: true
})

export const tabId = atom<number>({
    key: 'tabId',
    default: 1
})



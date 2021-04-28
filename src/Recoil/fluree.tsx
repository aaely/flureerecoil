import { atom, selector, selectorFamily } from 'recoil'
import { initProduct } from 'src/types/types'
import { fetchCannabinoidProducts, getMyPurchases, fetchProduct, fetchProducts, fetchTerpeneProducts, fetchTerpenes, fetchCategories, fetchCannabinoids } from '../queries'
import { initCannabinoids, initTerpenes, initLocation, Cannabinoid, Product } from '../types'
import { localStorageEffect } from '../utils/localStorageEffect.tsx'
import { getBgImages } from '../queries/getBgImages'


export const forceUpdate = atom<number>({
    key: 'forceUpdate',
    default: 0
})

export const handle = atom<string>({
    key: 'handle',
    default: '',
    persistence_UNSTABLE: {
        type: 'handle'
    }
})

export const terphandle = atom<string>({
    key: 'terphandle',
    default: ''
})

export const userToken = atom<string>({
    key: 'userToken',
    default: '',
    persistence_UNSTABLE: {
        type: 'userToken'
    }
})

export const locations = atom({
    key: 'locations',
    default: [initLocation()]
})

export const terpenes = atom({
    key: 'terpenes',
    default: [initTerpenes()],
    dangerouslyAllowMutability: true
})

export const products = atom({
    key: 'products',
    default: []
})

export const cannabinoids = atom<Array<Cannabinoid>>({
    key: 'cannabinoids',
    default: [initCannabinoids()]
})

export const bgImage = selector({
    key: 'bgImage',
    get: async ({get}) => {
        try {
            get(forceUpdate)
            const response = await getBgImages()
            return response[0]['sidebar/imageHashes']
        } catch(error) {
            console.log(error)
        }
    }
})

export const getTerpenes = selector({
    key: 'getTerpenes',
    get: async ({get}) => {
        try {
            get(forceUpdate)
            const response = await fetchTerpenes();
            return response
        } catch (error) {
            console.log(error)
        }
      },
    dangerouslyAllowMutability: true
})

export const getCannabinoids = selector({
    key: 'getCannabinoids',
    get: async ({get}) => {
        try {
            get(forceUpdate)
            const response = await fetchCannabinoids();
            console.log(response)
            return response
        } catch (error) {
            console.log(error)
        }
      }
})

export const getCategories = selector({
    key: 'getCategories',
    get: async ({get}) => {
        try {
            get(forceUpdate)
            const response = await fetchCategories();
            console.log(response)
            return response
        } catch (error) {
            console.log(error)
        }
      }
})


export const getProduct = selectorFamily({
    key: 'getProduct',
    get: param => async ({get}) => {
        try {
            get(forceUpdate)
            const response = await fetchProduct(param);
            console.log(response)
            return response
        } catch (error) {
            console.log(error)
        }
      }
})

export const getProductsByTerpene = selector({
    key: 'getProductsByTerpene',
    get: async ({get}) => {
        try {
            const param: string = get(terphandle)
            const response = await fetchTerpeneProducts(param)
            console.log(response[0]['terpene/products'])
            return response[0]['terpene/products']
        } catch(error) {
            console.log(error)
        }
    }
})

export const getProductsByCannabinoid = selector({
    key: 'getProductsByCannabinoid',
    get: async ({get}) => {
        try {
            const param: string = get(terphandle)
            const response = await fetchCannabinoidProducts(param)
            return response
        } catch(error) {
            console.log(error)
        }
    }
})

export const getProducts = selector({
    key: 'getProducts',
    get: async ({}) => {
        try {
            const response = await fetchProducts();
            return response
        } catch (error) {
            console.log(error)
        }
      }
})

export const getCustomerPurchases = selectorFamily({
    key: 'getCustomerPurchases',
    get: (param) => async ({get}) => {
        try{
            get(forceUpdate)
            const response = await getMyPurchases(param)
            return response
        } catch (error) {
            console.log(error)
        }
    }
})

export const filteredProducts = atom<Array<Product>>({
    key: 'filteredProducts',
    default: [],
    persistence_UNSTABLE: {
        type: 'filteredProducts'
    }
})

export const setFilteredProducts = selector({
    key: 'setFilteredProducts',
    set: ({get, set, reset}, message) => {
        console.log(message)
        reset(filteredProducts)
        switch(message.type) {
            case 'filter.name': {
                const allProducts: Product[] = get(getProducts)
                const filter: Product[] = allProducts.filter(prop => {
                    return prop['product/name'].toLowerCase().includes(message.data.message)
                })
                set(filteredProducts, filter)
                break;
            }
            case 'filter.cat': {
                const allProducts: Product[] = get(getProducts)
                const filter: Product[] = allProducts.filter(prop => {
                    return prop['product/category']['category/name'].includes(message.data.message)
                })
                set(filteredProducts, filter)
                break;
            }
            case 'filter.terpene': {
                get(forceUpdate)
                let id: string = message.data.message.id
                let filtered: Product[] = message.data.message.filter
                let a: any = []
                let sortedFilter: any = []
                for(let i: number = 0; i < filtered.length; i++) {
                    let b: any = filtered[i]['product/productProfileId']['productprofile/terpConc']
                    for(let j: number = 0; j < b.length; j++){
                        console.log(b[j], JSON.parse(b[j]), id, b[j][id])
                        if(JSON.parse(b[j])[id] !== undefined) {
                            const element: any = {concentration: JSON.parse(b[j])[id], product: filtered[i]['_id']}
                            a.push(element)
                        }
                    }
                }
                a.sort((x, y) => y.concentration - x.concentration)
                for(let k: number = 0; k < a.length; k++) {
                    for(let l: number = 0; l < filtered.length; l++) {
                        if(a[k].product === filtered[l]['_id']) {
                            sortedFilter.push(filtered[l])
                        }
                    }
                }
                set(filteredProducts, sortedFilter)
                break;
            }
            case 'filter.cannabinoid': {
                get(forceUpdate)
                const filtered: Product[] = message.data.message.filter
                const id: string = message.data.message.id
                let a: any = []
                let sortedFilter: Product[] = []
                for(let i: number = 0; i < filtered.length; i++) {
                    let b: any = filtered[i]['product/productProfileId']['productprofile/cannConc']
                    for(let j: number = 0; j < b.length; j++) {
                        if(JSON.parse(b[j])[id] !== undefined) {
                            const element: any = {concentration: JSON.parse(b[j])[id], product: filtered[i]['_id']}
                            a.push(element)
                        }
                    }
                }
                a.sort((x, y) => y.concentration - x.concentration)
                for(let k: number = 0; k < a.length; k++) {
                    for(let l: number = 0; l < filtered.length; l++) {
                        if(a[k].product === filtered[l]['_id']) {
                            sortedFilter.push(filtered[l])
                        }
                    }
                }
                console.log(sortedFilter)
                set(filteredProducts, sortedFilter)
                break;
            }
            default: break;
        }
    }
})
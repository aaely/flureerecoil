import { atom, atomFamily, selector, selectorFamily } from 'recoil'
import loadNetID from 'src/utils/loadNetID'
import loadAccount from '../utils/loadAccount'
import loadContract from '../utils/loadContract'
import loadWeb3 from '../utils/loadWeb3'
import { forceUpdate } from '../Recoil'
import loadAccountBalance from '../utils/loadAccountBalance'

export const account = atom({
    key: 'account',
    default: '',
    persistence_UNSTABLE: {
        type: 'accessToken'
    }
})

export const productCount = atom({
    key: 'productCount',
    default: 0
})

export const networkId = atom({
    key: 'networkId',
    default: 42,
    persistence_UNSTABLE: {
        type: 'accessToken'
    }
})

export const queryProduct = selectorFamily({
    key: 'queryData',
    get: param => async ({get}) => {
        get(forceUpdate)
        const methods = get(initializeContract)
        console.log(methods)
        const response = await methods.fetchProduct(param).call()
        console.log(response)
        return response
    }
})

/*export const getProducts = selector({
    key: 'getProducts',
    get: async ({get}) => {
        let response = []
        const methods = get(initializeContract)
        const count = await methods.productCount().call()
        console.log(count)
        for(let i = 1; i <= count; i++) {
            const prod = await methods.product(i).call()
            console.log(prod)
            response[i - 1] = prod
        }
        
        return response
    }
})*/

export const getCategoriesByname = selector({
    key: 'getCategoriesByName',
    get: async ({get}) => {
        get(forceUpdate)
        let response = []
        const methods = get(initializeContract)
        const count = await methods.categoryCount().call()
        for(let i = 1; i <= count; i++) {
            const cat = await methods.category(i).call()
            console.log(cat)
            response[i - 1] = cat
        }
        
        return response
    }
}) 

export const getCategoryCount = selector({
    key: 'getCategoryCount',
    get: async ({get}) => {
        get(forceUpdate)
        const methods = get(initializeContract)
        const response = await methods.categoryCount().call()
        console.log(response)
        return response
    }
})

export const getProductCount = selector({
    key: 'getProductCount',
    get: async ({get}) => {
        get(forceUpdate)
        const methods = get(initializeContract)
        const response = await methods.productCount().call()
        console.log(response)
        return response
    }
})

export const initializeContract = selector({
    key: 'initializeContract',
    get: async ({get}) => {
        try {
            get(forceUpdate)
            await loadWeb3()
            const response = await loadContract();
            return response.methods
        } catch (error) {
            console.log(error)
        }
      }
})

export const initializeAccount = selector({
    key: 'initializeAccount',
    get: async ({get}) => {
        try {
            get(forceUpdate)
            await loadWeb3()
            const response = await loadAccount();
            return response
        } catch (error) {
            console.log(error)
        }
      }
})

export const getNetworkId = selector({
    key: 'getNetowrkId',
    get: async ({get}) => {
        try {
            get(forceUpdate)
            await loadWeb3()
            const response = await loadNetID()
            return response
        } catch(error) {
            console.log(error)
        }
    }
})

export const etherBalance = selectorFamily({
    key: 'etherBalance',
    get: param => async ({get}) => {
        try {
            get(forceUpdate)
            await loadWeb3()
            const response = await loadAccountBalance(param)
            return response
        } catch(error) {
            console.log(error)
        }
    }
})
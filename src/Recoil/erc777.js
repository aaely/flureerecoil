import { atom, atomFamily, selector, selectorFamily } from 'recoil'
import loadERC777 from '../utils/loadERC777'
import loadWeb3 from '../utils/loadWeb3'
import { forceUpdate } from '../Recoil'

export const balance = atomFamily({
    key: 'balance',
    default: selectorFamily({
        key: 'getMATbalance',
        get: (param) => async ({get}) => {
            get(forceUpdate)
            const methods = get(initializeERC777)
            console.log(methods)
            const response = await methods.balanceOf(param).call()
            console.log(response)
            return response
        }
    }),
    dangerouslyAllowMutability: true,
})

export const getSymbol = selector({
    key: 'getSymbol',
    get: async ({get}) => {
        try {
            const methods = get(initializeERC777);
            const response = await methods.symbol().call()
            return response
        } catch (error) {
            console.log(error)
        }
      }
})

export const initializeERC777 = selector({
    key: 'initializeERC777',
    get: async () => {
        try {
            await loadWeb3()
            const response = await loadERC777();
            return response.methods
        } catch (error) {
            console.log(error)
        }
      }
})
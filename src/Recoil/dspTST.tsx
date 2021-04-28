import { atom, atomFamily, selector, selectorFamily } from 'recoil'
import loadDSPTST from '../utils/loadDSPTST'
import loadWeb3 from '../utils/loadWeb3'
import { forceUpdate } from '../Recoil'

export const tstbalance = atomFamily({
    key: 'tstbalance',
    default: selectorFamily({
        key: 'tstbalance',
        get: (param) => async ({get}) => {
            get(forceUpdate)
            const methods = get(initializeDSPTST)
            console.log(methods)
            const response = await methods.balanceOf(param).call()
            console.log(response)
            return response
        }
    }),
    dangerouslyAllowMutability: true,
})

export const getDSPTST = selector({
    key: 'getDSPTST',
    get: async ({get}) => {
        try {
            const methods = get(initializeDSPTST);
            const response = await methods.symbol().call()
            return response
        } catch (error) {
            console.log(error)
        }
      }
})

export const initializeDSPTST = selector({
    key: 'initializeDSPTST',
    get: async () => {
        try {
            await loadWeb3()
            const response = await loadDSPTST();
            return response.methods
        } catch (error) {
            console.log(error)
        }
      }
})
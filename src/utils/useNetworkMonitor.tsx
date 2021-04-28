import { useInterval } from '../utils/useInterval'
import { useState } from 'react'
import { networkId as ni, forceUpdate, account, initializeAccount } from '../Recoil'
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil'
import loadNetID from './loadNetID'

const useNetworkMonitor: Function = () => {

    const [networkId, setNetworkId] = useRecoilState(ni)
    const update: Function = useSetRecoilState(forceUpdate)
    const [tempId, setTempId] = useState<number>(0)
    const acct: string = useRecoilValue(initializeAccount)

    const setAccount: Function = useSetRecoilState(account)

    useInterval(() => {
        const getNetId: Function = async () => {
            const id: number = await loadNetID()
            setTempId(id)
        }
        getNetId()
        if(networkId !== tempId && tempId !== 0) {
            update(Math.random())
            console.log(networkId, tempId)
            console.log('network change detected')
            setNetworkId(tempId)
        }
    }, 3000)

    console.log(tempId, networkId)
}

export default useNetworkMonitor
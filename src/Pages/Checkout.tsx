import { FunctionComponent, useState } from 'react'
import { Button, Badge } from 'react-bootstrap'
import { cart as items, 
         totalCost, 
         balance as bal,
         initializeERC777,
         account as address,
         forceUpdate } from '../Recoil'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
//import getLiveETHUSD from '../utils/getLiveETHUSD'
import { useInterval } from '../utils/useInterval'
import Cart from '../Components/Cart.tsx'
import Loader from '../Components/Loader.tsx'

const Checkout: FunctionComponent = (props: any) => {
    
    const [loading, setloading] = useState(false)
    const account: string = useRecoilValue(address)
    const [count, setCount] = useState<number>(0)
    const [balance, setBalance] = useRecoilState<number>(bal(account))
    const methods = useRecoilValue(initializeERC777)
    const cost = useRecoilValue(totalCost)
    const setCart = useSetRecoilState(items)
    const update: Function = useSetRecoilState(forceUpdate)

    useInterval(() => {
        if(loading) {
            setCount(count + 1)
        }
    }, 1000)

    const makePayment = async () => {
        try {
            let total = window.web3.utils.toWei(`${cost}`, 'Finney')
            setloading(true)
            await methods.transfer('0x1Bbf5cEC49499336287E12e812e7366Ee2063074', total).send({ from: account })
            setCart([])
            update(Math.random())
            setloading(false)
            props.history.push('/')
        } catch(error) {
            console.log(error)
            setloading(false)
        }
    }
    const ethPayment = async () => {
        try {
            //const conversion = await getLiveETHUSD()
            let total: number = 0
            total = window.web3.utils.toWei(`${cost}`, 'Finney')
            setloading(true)
            await window.web3.eth.sendTransaction({from: account, to: '0x1Bbf5cEC49499336287E12e812e7366Ee2063074', value: total})
            setCart([])
            update(Math.random())
            setloading(false)
            props.history.push('/')
        } catch(error) {
            console.log(error)
            setloading(false)
        }
    }

    const renderLoading = () => {
        return(
            <div>
                <h2 style={{textAlign: 'center', marginTop: '10%'}}>Please wait for transaction confirmation...</h2>
                <h5 style={{textAlign: 'center'}}>{count}</h5>
                <br />
                <Loader type={`pacman`} />
            </div>
        )
    }
    
    const renderPage = () => {
        return(
            <>
                <Cart {...props} />
                <br />
                <h1>Balance:</h1>
                <p>{balance}</p>
                <Button variant='success' onClick={makePayment}>Purchase</Button>
                <Button variant='success' onClick={ethPayment}>Pay with Matic</Button>
            </>
        )
    }
    return(
        <div style={{margin: 'auto', textAlign: 'center'}}>
            {!loading && renderPage()}
            {loading && renderLoading()}
            <br/>
            <br/>
        </div>
    )
}

export default Checkout
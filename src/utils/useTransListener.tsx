import { useEffect } from 'react'
import Web3 from 'web3'

const newSocket = new WebSocket('ws://localhost:3334/')

newSocket.onopen = () => {
    console.log('hello', newSocket)
}

const useTransListener: Function = () => {
    
    useEffect(() => {
        
        newSocket.onmessage = ({ data }: any) => {
            const message: JSON = JSON.parse(data)
            console.log(message)
        }

        /*window.web3.currentProvider.connection.onMessage = ({ data }: any) => {
            const message: JSON = JSON.parse(data)
            console.log(message)
        }*/

        /*window.web3.eth.subscribe('logs', {
            address: '0xBcA3320e93C54513A467Bb517dC25f9Eba15e779'
        }, function(error: any, result: any){
            if (!error) {
                console.log(result)
            } else {
                console.log(error)
            }
        })
        .on("data", function(log: any){
            console.log(log);
        })
        .on("changed", function(log: any){
            console.log(log)
        });*/

    }, [])

    return null
}

export default useTransListener
import Dispensary from '../abis/Dispensary.json'

export default async function loadContract() {
    const web3 = window.web3
    return new web3.eth.Contract(Dispensary, "0x8a699BeA25D250077745513551668ae23CbddE09") 
}
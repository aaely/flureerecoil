import ERC777 from '../abis/ERC777.json'

export default async function loadDSPTST() {
    const web3 = window.web3
    return new web3.eth.Contract(ERC777, "0x4397E651F82d8EB853d7B7a6FD6ABa9E1eF89d89") 
}

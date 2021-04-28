import ERC777 from '../abis/ERC777.json'

export default async function loadERC777() {
    const web3 = window.web3
    return new web3.eth.Contract(ERC777, "0x3Fd05f80190745928802C0458FB204b88877B850") 
}

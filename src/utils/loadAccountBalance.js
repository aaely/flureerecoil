export default async function loadAccount(address) {
    const web3 = window.web3
        // Load account
        const balance = await web3.eth.getBalance(address)
        return balance
}
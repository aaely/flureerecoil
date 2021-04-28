import { flureeFetch } from '../utils/flureeFetch'

const newCustomer = async (address, firstName, lastName, license, phone, email, dob) => {
    const add_customer = [{
        "_id": "customer",
        "handle": `${address}`,
        "firstName": `${firstName}`,
        "lastName": `${lastName}`,
        "license": `${license}`,
        "phone": `${phone}`,
        "email": `${email}`,
        "dob": `${dob}`
    }]

    const res = await flureeFetch('/transact', add_customer)
    return res
}

export { newCustomer };
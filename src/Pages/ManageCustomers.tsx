import { FunctionComponent, useState } from 'react'
import NewCustomer from '../Components/NewCustomer.tsx'

const ManageCustomers: FunctionComponent = (props: any) => {
    console.log('hello')
    return(
        <div style={{textAlign: 'center', maxWidth: '75%', margin: 'auto', marginTop: '5%'}}>
            <NewCustomer {...props} />
        </div>
    )
}

export default ManageCustomers
import { send } from '../ws'
import { useEffect } from 'react'
import { Table, Button, Badge } from 'react-bootstrap'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { resetCart, account as a, cart as thisPurchase, totalCost, updateTotalCost } from '../Recoil'
import { BsPlusCircleFill, BsFillDashCircleFill, BsFillTrashFill } from 'react-icons/bs'
import { Item } from '../types'

const Cart: Function = ({...props}) => {
    const cart: Item[] = useRecoilValue(thisPurchase)
    const account:string = useRecoilValue(a)
    const updateTotal: Function = useSetRecoilState(updateTotalCost)
    const cost = useRecoilValue(totalCost)
    const reset: Function = useSetRecoilState(resetCart)

    const inc: Function = (crt: Item[], item: Item[]) => {
        const payload: any = { cart: crt, item: item }
        send('increaseQuantity', payload, account)
    }

    const dec: Function = (crt: Item[], item: Item[]) => {
        const payload: any = { cart: crt, item: item }
        send('decreaseQuantity', payload, account)
    }

    const del: Function =(crt: Item[], item: Item[]) => {
        const payload: any = { cart: crt, item: item }
        send('deleteItem', payload, account)
    }

    const freshCart: Function = () => {
        reset()
        if(window.location.pathname === '/checkout') {
            window.location.replace('/')
        }
    }

    useEffect(() => {
        updateTotal(cart)
    }, [updateTotal, cart])

    return(
        <div style={{margin: 'auto'}}>
            <h3>Shopping Cart</h3>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>
                            Item #
                        </th>
                        <th>
                            Product Name
                        </th>
                        <th>
                            Product Cost
                        </th>
                        <th>
                            Product Quantity
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {cart && cart.length > 0 && cart.map((item: Item, index: number) => {
                        return(
                            <>
                                
                                <tr key={item.id}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>
                                        {item.cost}
                                    </td>
                                    <td>
                                        {item.quantity}
                                    </td>
                                </tr>
                                <Badge variant='success' onClick={() => inc(cart, item)}><BsPlusCircleFill /></Badge>
                                <Badge variant='danger' onClick={() => dec(cart, item)}><BsFillDashCircleFill /></Badge>
                                <Button variant='danger' onClick={() => del(cart, item)}><BsFillTrashFill /></Button>
                            </>
                        )
                    })}
                </tbody>
            </Table>
            <h3>Total Cost: $ {cost}</h3>
            <Button variant='danger' onClick={freshCart}>Clear Cart</Button>
        </div>
    )
}

export default Cart
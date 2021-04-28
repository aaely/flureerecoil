import { Button } from 'reactstrap'
import { resetCart, cart as items, updateTotalCost, account as a } from '../Recoil'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import '../App.css';
import { Item, Product } from '../types/types'
import { send } from '../ws'
import { useEffect } from 'react';

interface PropTypes {
    products: Product[]
}

export default function Test4 (props: PropTypes) {

    const cart: Item[] = useRecoilValue(items)
    const account: string = useRecoilValue(a)

    const addToCart: Function = (data: Product, crt: Item[]) => {
        const payload: any = { cart: crt, item: data }
        send('add.to.cart', payload, account)
    }

    return(
        <div className='App'>
            Product: <br /> {props.products && props.products.map(a => {
                return(
                    <p key={a['_id']} >
                        {a['product/name']}  {a['product/cost']} <Button color='success' onClick={() => addToCart(a, cart)}>Add To Cart</Button>
                    </p>
                )
            })}
        </div>
    )
}
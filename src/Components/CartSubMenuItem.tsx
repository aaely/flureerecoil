import { Item } from '../types'
import { send } from '../ws'
import { BsPlusCircleFill, BsFillDashCircleFill, BsFillTrashFill } from 'react-icons/bs'
import { SubMenu, MenuItem } from 'react-pro-sidebar'
import { Link } from 'react-router-dom'
import { Badge, Row } from 'react-bootstrap'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { cart as items, resetCart, account as a } from '../Recoil'
import 'react-pro-sidebar/dist/css/styles.css';


interface PropTypes {
    cartItem: Item
}

const CartSubMenu: Function = (props: PropTypes) => {

    const cart: Item[] = useRecoilValue(items)
    const account: string = useRecoilValue(a)

    const incQty: Function = (crt: Item[], item: Item[]) => {
        const payload: any = { cart: crt, item: item }
        send('increaseQuantity', payload, account)
    }

    const decQty: Function = (crt: Item[], item: Item[]) => {
        const payload: any = { cart: crt, item: item }
        send('decreaseQuantity', payload, account)
    }

    const delItem: Function = (crt: Item[], item: Item[]) => {
        const payload: any = { cart: crt, item: item }
        send('deleteItem', payload, account)
    }

    return(
            <SubMenu key={props.cartItem.id} title={props.cartItem.name} suffix={props.cartItem.quantity}>
                <Row>
                    <MenuItem><Badge variant='success'><Link onClick={() => incQty(cart, props.cartItem)}><BsPlusCircleFill /></Link></Badge></MenuItem>
                    <MenuItem><Badge variant='danger'><Link onClick={() => decQty(cart, props.cartItem)}><BsFillDashCircleFill /></Link></Badge></MenuItem>
                    <MenuItem><Badge variant='danger'><Link onClick={() => delItem(cart, props.cartItem)}><BsFillTrashFill /></Link></Badge></MenuItem>
                </Row>
            </SubMenu>
    )
}

export default CartSubMenu
import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { useEffect } from 'react'
import { FaTelegram, FaGem, FaHeart, FaEthereum } from 'react-icons/fa'
import { tstbalance, getDSPTST, getSymbol, account as a, balance, etherBalance, cart as items, totalCost, resetCart, updateTotalCost } from '../Recoil'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { BsGearFill } from 'react-icons/bs'
import { Item } from '../types'
import { Badge, Button, Row } from 'react-bootstrap'
import { GiHemp, GiMusicSpell, GiShoppingCart } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import CartSubMenuItem from './CartSubMenuItem.tsx'
import SpotifySubMenu from './SpotifySubMenu.tsx'
import useExpTimer from '../utils/useExpTimer.tsx'
import 'react-pro-sidebar/dist/css/styles.css';

interface PropTypes {
    changeHandler: Function
}

const MySidebarContent: Function = (props: PropTypes) => {
    useExpTimer()

    const account: string = useRecoilValue(a)
    const cart = useRecoilValue<Array<Item>>(items)
    const total: number = useRecoilValue(totalCost)
    const reset: Function = useSetRecoilState(resetCart)
    const updateCost: Function = useSetRecoilState(updateTotalCost)
    const eth: number = useRecoilValue(etherBalance(account))
    const getBalance: number = useRecoilValue(balance(account))
    const symbol: string = useRecoilValue(getSymbol)
    const tbalance: number = useRecoilValue(tstbalance(account))
    const tsymbol: string = useRecoilValue(getDSPTST)

    useEffect(() => {
        updateCost(cart)
    }, [cart, updateCost])

    /*const sendEth: Function = () => {
        await window.web3.eth.sendTransaction({from: account, to: , value: amount})
    }*/

    const cartSuffix: Function = () => {
        return(
            <>
                {cart.length > 0 && <Badge variant='warning'>{cart.length}</Badge>}
                {cart.length === 0 && <Badge variant='danger'>EMPTY</Badge>}
            </>
        )
    }

    const cartPrefix: Function = () => {
        return(
            <>
                {total > 0 && <Badge variant='success'>${total}</Badge>}
            </>
        )
    }

    const cartIcon: Function = () => {
        return(
            <div>
                <Link to='#/nothing'><GiShoppingCart /><sup>{cartSuffix()}</sup></Link>
            </div>
        )
    }

    const sendIcon: Function = () => {
        return(
            <div>
                <Badge variant='success'><FaTelegram /></Badge>
            </div>
        )
    }

    return(
        <>
            <Menu iconShape="square">
                <MenuItem icon={<FaGem />}><Link to='/'>Dashboard</Link></MenuItem>
                <MenuItem icon={<GiHemp />}>
                    <Link to='/editProduct'>Dispensary</Link>
                </MenuItem>
                <SubMenu title="Links" icon={<FaHeart />}>
                    <MenuItem><Link to='/spotify'>Spotify</Link></MenuItem>
                    <MenuItem><Link to='/editTerpene'>Manage Terpenes</Link></MenuItem>
                    <MenuItem><Link to='/editCannabinoid'></Link>Manage Cannabinoids</MenuItem>
                    <MenuItem><Link to='/editProduct'></Link>Manage Products</MenuItem>
                </SubMenu>
                <SubMenu title="Settings" icon={<BsGearFill />} >
                    <MenuItem><div onClick={() => props.changeHandler('collapsed')} color='secondary'>Collapsed</div></MenuItem>
                    <MenuItem><div onClick={() => props.changeHandler('rtl')} color='secondary'>R-t-L</div></MenuItem>
                    <MenuItem><div onClick={() => props.changeHandler('image')} color='secondary'>Use Background Image</div></MenuItem>
                    <MenuItem><div onClick={() => props.changeHandler('toggled')} color='secondary'>Toggle</div></MenuItem>
                </SubMenu>
                <MenuItem icon={<GiMusicSpell />}>
                    <Link to='/spotify'>Spotify</Link>
                </MenuItem>
                <SubMenu icon={cartIcon()} suffix={cartSuffix()} prefix={cartPrefix()}>
                    {cart.length > 0 && cart.map((item: Item) => {
                        return(
                            <>
                                <CartSubMenuItem
                                cartItem={item}
                                />
                            </>
                        )
                    })}
                    {cart.length > 0 && <MenuItem><Button variant='danger' onClick={() => reset()}>Empty Cart</Button></MenuItem>}
                    <MenuItem>Total: ${total}</MenuItem>
                    {cart.length > 0 && <MenuItem><Link to='/checkout'>Checkout</Link></MenuItem>}
                </SubMenu>
                <SubMenu icon={<FaEthereum />} title='Crypto Wallet'>
                    <SubMenu title={`ETH: ${window.web3.utils.fromWei(eth, 'Ether')}`}>
                        <Row>
                            <MenuItem><Button variant='success'><FaTelegram /></Button></MenuItem>
                        </Row>
                    </SubMenu>
                    <SubMenu title={`${symbol}: ${window.web3.utils.fromWei(getBalance, 'Ether')}`}>
                        <Row>
                            <MenuItem><Badge variant='success'><FaTelegram /></Badge></MenuItem>
                        </Row>
                    </SubMenu>
                    <SubMenu title={`${tsymbol}: ${window.web3.utils.fromWei(tbalance, 'Ether')}`}>
                        <Row>
                            <MenuItem><Badge variant='success'><FaTelegram /></Badge></MenuItem>
                        </Row>    
                    </SubMenu>                    
                </SubMenu>
                <SpotifySubMenu />
            </Menu>
        </>
    )
}

export default MySidebarContent
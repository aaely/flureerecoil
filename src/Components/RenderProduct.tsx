import { Button, Card, Row, Col } from 'react-bootstrap'
import { resetCart, cart as items, updateTotalCost, account as a, handle as h } from '../Recoil'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import '../App.css';
import { Item, Product } from '../types/types'
import { send } from '../ws'
import { useEffect, useState } from 'react';

interface PropTypes {
    product: Product,
    setCurrentView: Function
}

const RenderProducts: Function = (props: PropTypes) => {

    const updateCost: Function = useSetRecoilState(updateTotalCost)
    const reset: Function = useSetRecoilState(resetCart)
    const account: string = useRecoilValue(a)
    const cart: Item[] = useRecoilValue(items)
    const setHandle: Function = useSetRecoilState(h)
    const [showMessage, setShowMessage] = useState<boolean>(false)
    
    const addToCart: Function = (data: Product, crt: Item[]) => {
        const payload: any = { cart: crt, item: data }
        setShowMessage(true)
        //reset()
        send('add.to.cart', payload, account)
        setTimeout(() => {setShowMessage(false)}, 1000)
    }

    const viewProduct: Function = (view: string, hdl: string) => {
        setHandle(hdl)
        props.setCurrentView(view)
    }

    useEffect(() => {
        updateCost(cart)
    }, [updateCost, cart])

    return(
        <>
            <Row style={{display: 'inline-block', maxWidth: '80%', margin: '5px', height: '500px'}} key={props.product['_id']}>
                <Col md={50}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={`https://ipfs.io/ipfs/${props.product['product/imageHash']}`} style={{maxHeight: '300px'}} />
                        <Card.Body>
                            <Card.Title>{props.product['product/name']}</Card.Title>
                            <Card.Text>
                            ${props.product['product/cost']}
                            </Card.Text>
                            <Button style={{margin: '2px'}} variant='info' onClick={() => viewProduct('product', props.product['product/handle'])} >Details</Button>
                            {!showMessage && <Button style={{margin: '2px'}} onClick={() => addToCart(props.product, cart)} variant="success">Add to Cart</Button>}
                            {showMessage && <Button style={{margin: '2px'}} variant="secondary">Added to Cart</Button>}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default RenderProducts